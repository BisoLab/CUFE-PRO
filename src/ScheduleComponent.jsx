import React, { useState, useRef, useCallback } from 'react';
import { toPng } from 'html-to-image';
import { Download, Palette, Loader2 } from 'lucide-react';

const ScheduleComponent = ({ rawScheduleData, studentName }) => {
  const [lectureColor, setLectureColor] = useState('#FFDE59'); 
  const [tutorialColor, setTutorialColor] = useState('#5CE1E6');
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Ref for the wrapper element
  const tableRef = useRef(null);

  // 1. Helper: Calculate text color for contrast
  const getContrastColor = (hex) => {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    return yiq >= 128 ? '#000000' : '#FFFFFF';
  };

  // 2. HELPER: Time Conversion & ROUNDING
  const get24Hour = (timeStr, isEndTime = false) => {
    if (!timeStr) return 0;
    let [h, m] = timeStr.split(':');
    h = parseInt(h);
    m = parseInt(m);
    if (h < 8) h += 12; 
    if (isEndTime && m >= 45) h += 1;
    return h;
  };

  // 3. Parsing Logic
  const parseSchedule = (text) => {
    const lines = text.split('\n').map(l => l.trim()).filter(l => l);
    const schedule = {};
    let currentDay = '';
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];
    const courseRegex = /^(.+?),\s*(.+?)\s*:\s*(.+?)\s*At\s*\[(.+?)\](?:\((.+?)\))?(.+?)\s*From\s*(\d{1,2}:\d{2})\s*To\s*(\d{1,2}:\d{2})/;

    lines.forEach(line => {
      if (days.some(d => line.includes(d))) {
        currentDay = days.find(d => line.includes(d));
        schedule[currentDay] = [];
      } else if (currentDay) {
        const match = line.match(courseRegex);
        if (match) {
            const groupMatch = line.match(/-\s*(\d+)\s*-$/); 
            const group = groupMatch ? groupMatch[1] : '?';
            let finalLocation = match[4];
            if (finalLocation === '0' && match[5]) finalLocation = match[5];
            const rawType = match[3].trim(); 
            const strictType = rawType.split(' ').pop(); 

            schedule[currentDay].push({
                code: match[1],
                name: match[2], 
                type: strictType,
                location: finalLocation,
                start: match[7],
                end: match[8],
                group: group,
                start24: get24Hour(match[7], false),
                end24: get24Hour(match[8], true)
            });
        }
      }
    });
    return schedule;
  };

  const scheduleData = parseSchedule(rawScheduleData);
  const displayHours = ["8:00 - 9:00", "9:00 - 10:00", "10:00 - 11:00", "11:00 - 12:00", "12:00 - 1:00", "1:00 - 2:00", "2:00 - 3:00", "3:00 - 4:00", "4:00 - 5:00", "5:00 - 6:00", "6:00 - 7:00"];

  // 4. Export Logic using html-to-image
 const handleDownloadImage = useCallback(async () => {
    if (tableRef.current === null) return;
    
    setIsGenerating(true);

    try {
      // 1. Get the current size of the table on screen
      const node = tableRef.current;
      const originalWidth = node.offsetWidth;
      const originalHeight = node.offsetHeight;

      // 2. Define how much padding you want (50px on all sides = 100px total extra)
      const padding = 50;
      const totalPadding = padding * 2;

      const dataUrl = await toPng(node, {
        cacheBust: true,
        backgroundColor: '#ffffff',
        pixelRatio: 2,
        
        // 3. FORCE the canvas to be larger than the original element
        width: originalWidth + totalPadding,
        height: originalHeight + totalPadding,

        style: {
           // 4. Add the padding to the internal content to center it in that new space
           padding: `${padding}px`,
           
           // Ensure the element knows it can grow to fill the new canvas
           width: `${originalWidth + totalPadding}px`,
           height: `${originalHeight + totalPadding}px`,
           
           // Reset transforms just in case
           transform: 'none',
           boxSizing: 'border-box'
        }
      });

      const link = document.createElement('a');
      link.download = `${studentName || 'My'}_Schedule.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to generate image', err);
    } finally {
      setIsGenerating(false);
    }
  }, [studentName]);

  return (
    <div className="space-y-8 animate-in fade-in zoom-in duration-500">
      
      {/* Controls */}
      <div className="bg-white p-4 border-4 border-neu-black rounded-xl shadow-neu flex flex-wrap gap-6 items-center justify-between">
        <div className="flex gap-4 items-center">
            <Palette className="text-neu-black" />
            <div className="flex flex-col">
                <label className="text-xs font-bold uppercase">Lecture</label>
                <input type="color" value={lectureColor} onChange={(e) => setLectureColor(e.target.value)} className="h-8 w-20 border-2 border-neu-black rounded cursor-pointer" />
            </div>
            <div className="flex flex-col">
                <label className="text-xs font-bold uppercase">Tutorial</label>
                <input type="color" value={tutorialColor} onChange={(e) => setTutorialColor(e.target.value)} className="h-8 w-20 border-2 border-neu-black rounded cursor-pointer" />
            </div>
        </div>
        
        <button 
            onClick={handleDownloadImage}
            disabled={isGenerating}
            className="bg-neu-black text-white px-6 py-2 rounded-lg font-bold border-2 border-transparent hover:bg-white hover:text-neu-black hover:border-neu-black transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
            {isGenerating ? <Loader2 className="animate-spin" size={18} /> : <Download size={18} />}
            {isGenerating ? 'Generating...' : 'Save as PNG'}
        </button>
      </div>

      {/* Visual Table Wrapper */}
      <div className="overflow-x-auto pb-4">
        
        <div ref={tableRef} className="w-fit bg-white">

            {/* The Actual Card (Ref removed from here) */}
            <div className="min-w-[1000px] bg-white border-4 border-neu-black rounded-xl p-6 relative">
                
                {/* Header Info */}
                <div className="mb-6 flex justify-between items-end border-b-4 border-neu-black pb-4">
                    <h2 className="text-3xl font-black uppercase tracking-tight">{studentName}'s Schedule</h2>
                </div>

                {/* THE GRID */}
                <div className="grid grid-cols-6 gap-0 border-2 border-neu-black bg-neu-black">
                    
                    {/* 1. Header Row (Days) */}
                    <div className="bg-neu-yellow p-3 border-r-2 border-b-2 border-neu-black font-black text-center">Time</div>
                    {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'].map(day => (
                        <div key={day} className="bg-white p-3 border-r-2 border-b-2 border-neu-black font-black text-center uppercase tracking-wide">
                            {day}
                        </div>
                    ))}

                    {/* 2. Time Slots Logic */}
                    {displayHours.map((timeStr) => {
                        const rowHour24 = get24Hour(timeStr, false); 

                        return (
                            <React.Fragment key={timeStr}>
                                <div className="bg-gray-100 border-r-2 border-b-2 border-neu-black p-2 font-bold text-center flex items-center justify-center text-sm">
                                    {timeStr}
                                </div>
                                
                                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'].map(day => {
                                    const dayCourses = scheduleData[day] || [];
                                    const course = dayCourses.find(c => c.start24 === rowHour24);

                                    return (
                                        <div key={`${day}-${timeStr}`} className="bg-white border-r-2 border-b-2 border-neu-black relative h-24 p-1">
                                            {course && (
                                                <div 
                                                    className="w-full h-full rounded border-2 border-neu-black p-2 text-xs flex flex-col justify-start gap-0.5 overflow-hidden shadow-[2px_2px_0px_rgba(0,0,0,1)] z-10 relative"
                                                    style={{
                                                        backgroundColor: course.type === 'Lecture' ? lectureColor : tutorialColor,
                                                        color: getContrastColor(course.type === 'Lecture' ? lectureColor : tutorialColor),
                                                        height: `calc(${(course.end24 - course.start24) * 100}% + ${(course.end24 - course.start24 - 1) * 2}px)`
                                                    }}
                                                >
                                                    <div className="font-black text-[11px] opacity-70 leading-tight">{course.code}</div>
                                                    <div className="font-black text-[15px] leading-tight line-clamp-2 my-auto">{course.name}</div>
                                                    <div className="mt-auto flex justify-between items-center border-t border-black/10 pt-1 text-[11px]">
                                                        <span className="font-bold truncate max-w-[60%]">{course.location}</span>
                                                        <div className="flex items-center gap-1">
                                                        <span className="font-black text-[10px] uppercase tracking-wider opacity-70">
                                                                {course.type === 'Lecture' ? 'LEC' : 'TUT'}
                                                            </span>
                                                            <span className="bg-black/10 px-1.5 rounded font-bold text-[11px]">
                                                                {course.group}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}
                            </React.Fragment>
                        )
                    })}
                </div>
                
                <div className="mt-6 text-center text-xs font-bold text-gray-400">
                    Generated via CUFE PRO
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleComponent;