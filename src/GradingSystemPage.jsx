import React from 'react';
import { Award, BookOpen, AlertCircle, Hash } from 'lucide-react';

const GradingSystemPage = () => {

  // Data for the main grading table with explicit Mark clusters
  const gradeScale = [
    { marks: [100, 99, 98, 97], range: "97% and above", grade: "A+", points: "4.00" },
    { marks: [96, 95, 94, 93], range: "93% to < 97%", grade: "A", points: "4.00" },
    { marks: [92, 91, 90, 89], range: "89% to < 93%", grade: "A−", points: "3.70" },
    { marks: [88, 87, 86, 85, 84], range: "84% to < 89%", grade: "B+", points: "3.30" },
    { marks: [83, 82, 81, 80], range: "80% to < 84%", grade: "B", points: "3.00" },
    { marks: [79, 78, 77, 76], range: "76% to < 80%", grade: "B−", points: "2.70" },
    { marks: [75, 74, 73], range: "73% to < 76%", grade: "C+", points: "2.30" },
    { marks: [72, 71, 70], range: "70% to < 73%", grade: "C", points: "2.00" },
    { marks: [69, 68, 67], range: "67% to < 70%", grade: "C−", points: "1.70" },
    { marks: [66, 65, 64], range: "64% to < 67%", grade: "D+", points: "1.30" },
    { marks: [63, 62, 61, 60], range: "60% to < 64%", grade: "D", points: "1.00" },
    { marks: ["< 60"], range: "Less than 60%", grade: "F", points: "0.00" },
  ];

  // Special cases (Incomplete, Withdrawal, etc.)
  const specialCases = [
    { grade: "IC", points: "Not included", note: "Incomplete" },
    { grade: "W", points: "Not included", note: "Approved Withdrawal" },
    { grade: "FW", points: "Not included", note: "Enforced Withdrawal" },
  ];

  // Data for the Cumulative GPA table
  const cumulativeScale = [
    { range: "3.60 to 4.00", rating: "Excellent" },
    { range: "2.80 to < 3.60", rating: "Very Good" },
    { range: "2.00 to < 2.80", rating: "Good" },
  ];

  // CSS pattern for hashed empty cells
  const hashedPattern = "repeating-linear-gradient(45deg, #f3f4f6 0, #f3f4f6 10px, #e5e7eb 10px, #e5e7eb 20px)";

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-12">
      
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-4 bg-neu-yellow border-4 border-neu-black rounded-full shadow-neu mb-4">
          <Award size={48} strokeWidth={2.5} />
        </div>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
          Grading <span className="text-neu-blue">System</span>
        </h1>
        <p className="text-xl font-medium text-gray-700 max-w-2xl mx-auto">
          Reference guide for Marks, Credit Hours, and GPA points.
        </p>
      </div>

      {/* TABLE 1: Course Evaluation */}
      <div className="bg-white border-4 border-neu-black rounded-3xl shadow-neu overflow-hidden">
        <div className="bg-neu-orange p-6 border-b-4 border-neu-black flex items-center gap-4">
          <BookOpen className="w-8 h-8 text-white" />
          <h2 className="text-2xl font-black uppercase text-white tracking-wide">Course Evaluation</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100 text-neu-black text-lg border-b-4 border-neu-black">
                {/* Added Marks Column */}
                <th className="p-4 md:p-6 font-black uppercase border-r-2 border-neu-black w-1/3">Marks</th>
                <th className="p-4 md:p-6 font-black uppercase border-r-2 border-neu-black">Range</th>
                <th className="p-4 md:p-6 font-black uppercase border-r-2 border-neu-black text-center">Grade</th>
                <th className="p-4 md:p-6 font-black uppercase text-center">Points</th>
              </tr>
            </thead>
            <tbody className="font-bold text-gray-800">
              {/* Standard Grades */}
              {gradeScale.map((item, index) => (
                <tr key={index} className="border-b-2 border-neu-black hover:bg-neu-yellow/20 transition-colors">
                  {/* Marks Display as Badges */}
                  <td className="p-4 border-r-2 border-neu-black">
                    <div className="flex flex-wrap gap-2">
                        {item.marks.map((mark, i) => (
                            <span key={i} className="inline-block px-2 py-1 bg-white border-2 border-neu-black rounded-md text-[18px] font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                                {mark}
                            </span>
                        ))}
                    </div>
                  </td>
                  <td className="p-4 border-r-2 border-neu-black text-xl ">{item.range}</td>
                  <td className="p-4 border-r-2 border-neu-black text-center text-xl font-black bg-gray-50">{item.grade}</td>
                  <td className="p-4 text-center text-xl">{item.points}</td>
                </tr>
              ))}

              {/* Special Cases */}
              {specialCases.map((item, index) => (
                <tr key={`special-${index}`} className="border-b-2 border-neu-black last:border-b-0">
                  {/* COMBINED Marks & Range Columns (ColSpan 2) */}
                  <td 
                    colSpan={2}
                    className="p-4 border-r-2 border-neu-black text-center"
                    style={{ background: hashedPattern }}
                  >
                    <span className="inline-block bg-white/90 px-3 py-1 border-2 border-neu-black rounded-lg text-sm font-bold shadow-sm">
                      {item.note}
                    </span>
                  </td>
                  
                  {/* Grade */}
                  <td className="p-4 border-r-2 border-neu-black text-center text-xl font-black text-neu-orange">
                    {item.grade}
                  </td>
                  
                  {/* Points */}
                  <td className="p-4 text-center text-gray-600">
                    {item.points}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* TABLE 2: Cumulative GPA */}
      <div className="bg-white border-4 border-neu-black rounded-3xl shadow-neu overflow-hidden relative">
        {/* Decorative element */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-neu-orange border-l-4 border-b-4 border-neu-black rounded-bl-[4rem] z-10 flex items-center justify-center">
            <Hash className="text-white mr-2 mb-2" size={32} />
        </div>

        <div className="bg-neu-black p-6 border-b-4 border-neu-black flex items-center gap-4">
          <AlertCircle className="w-8 h-8 text-neu-yellow" />
          <h2 className="text-2xl font-black uppercase text-neu-yellow tracking-wide">Cumulative GPA</h2>
        </div>

        <div className="p-0 overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-neu-yellow text-neu-black border-b-4 border-neu-black">
                <th className="p-4 md:p-6 font-black uppercase border-r-4 border-neu-black w-1/2">Cumulative GPA Range</th>
                <th className="p-4 md:p-6 font-black uppercase w-1/2">Rating</th>
              </tr>
            </thead>
            <tbody className="font-bold text-gray-800 text-lg">
              {cumulativeScale.map((item, index) => (
                <tr key={index} className="border-b-2 border-neu-black last:border-b-0 hover:bg-gray-50">
                  <td className="p-5 border-r-4 border-neu-black">{item.range}</td>
                  <td className={`p-5 uppercase font-black ${
                    index === 0 ? 'text-green-600' : 
                    index === 1 ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {item.rating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 bg-gray-50 border-t-4 border-neu-black text-sm font-bold text-gray-500 text-center">
          * Based on Clause (7/20) CUFE-CHS Regulations
        </div>
      </div>
      
    </div>
  );
};

export default GradingSystemPage;