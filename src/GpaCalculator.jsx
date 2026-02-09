import React, { useState, useRef } from 'react';
import { Calculator, Check, AlertCircle, Trash2 } from 'lucide-react';

const GRADE_VALUES = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'F': 0.0,
  'P': null, 'NP': null, 'W': null
};

const INITIAL_ROWS = Array(10).fill({ name: '', hours: '', grade: '' });

const GpaCalculator = () => {
  const topRef = useRef(null); // Reference for scrolling
  
  const [knowCgpa, setKnowCgpa] = useState(false);
  const [currentCgpa, setCurrentCgpa] = useState('');
  const [totalCredits, setTotalCredits] = useState('');
  const [courses, setCourses] = useState(INITIAL_ROWS);
  const [results, setResults] = useState({ semesterGpa: null, cumulativeGpa: null });
  const [error, setError] = useState('');

  const handleCourseChange = (index, field, value) => {
    const updatedCourses = [...courses];
    updatedCourses[index] = { ...updatedCourses[index], [field]: value };
    setCourses(updatedCourses);
    if (error) setError('');
  };

  const calculateGpa = () => {
    let semPoints = 0;
    let semCredits = 0;
    let validRows = 0;
    let validationError = false;

    // 1. Process Semester Data
    for (let i = 0; i < courses.length; i++) {
      const { hours, grade } = courses[i];

      // Skip empty rows
      if (!hours && !grade) continue;

      // Validation: Partial rows are not allowed
      if ((hours && !grade) || (!hours && grade)) {
        setError(`Row ${i + 1} is incomplete. Please select both Hours and Grade.`);
        validationError = true;
        break;
      }

      validRows++;
      
      const gradePoint = GRADE_VALUES[grade];
      const creditHours = parseInt(hours);

      // Only calculate if it's a graded course (exclude P, NP, W)
      if (gradePoint !== null) {
        semPoints += gradePoint * creditHours;
        semCredits += creditHours;
      }
    }

    if (validationError) return;
    if (validRows === 0) return setError("Please fill in at least one course.");

    // 2. Validate CGPA inputs if checked
    if (knowCgpa) {
      if (!currentCgpa || !totalCredits) {
        return setError("Please fill in your Current CGPA and Total Credits.");
      }
    }

    // 3. Calculate Results
    const calculatedSemGpa = semCredits > 0 ? (semPoints / semCredits).toFixed(2) : "0.00";
    
    let calculatedCgpa = null;
    if (knowCgpa) {
      const oldPoints = parseFloat(currentCgpa) * parseFloat(totalCredits);
      const newTotalPoints = oldPoints + semPoints;
      const newTotalCredits = parseFloat(totalCredits) + semCredits;
      calculatedCgpa = (newTotalPoints / newTotalCredits).toFixed(2);
    }

    setResults({
      semesterGpa: calculatedSemGpa,
      cumulativeGpa: calculatedCgpa
    });
    setError('');

    // SCROLL TO TOP
    topRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const clearAll = () => {
    setCourses(INITIAL_ROWS);
    setResults({ semesterGpa: null, cumulativeGpa: null });
    setCurrentCgpa('');
    setTotalCredits('');
    setError('');
  };

  return (
    <div ref={topRef} className="max-w-4xl mx-auto p-4 space-y-8 pb-20">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-black uppercase">GPA Calculator</h1>
        <p className="text-gray-600 font-medium">Crunch the numbers, see your future.</p>
      </div>

      {/* RESULT BOXES */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Semester GPA Box */}
        <div className="bg-neu-blue border-4 border-neu-black rounded-2xl p-6 shadow-neu flex flex-col items-center justify-center min-h-[160px] relative overflow-hidden">
          <div className="absolute top-2 right-2 opacity-20">
            <Calculator size={64} />
          </div>
          <h2 className="text-xl font-bold uppercase mb-2">Semester GPA</h2>
          <div className="text-6xl font-black bg-white border-4 border-neu-black rounded-xl px-6 py-2 shadow-sm transform -rotate-2">
            {results.semesterGpa || "-.--"}
          </div>
        </div>

        {/* CGPA Box - Conditional Styling */}
        <div className={`border-4 border-neu-black rounded-2xl p-6 shadow-neu flex flex-col items-center justify-center min-h-[160px] transition-all duration-300 ${knowCgpa ? 'bg-neu-orange' : 'bg-gray-100 opacity-60'}`}>
          <h2 className="text-xl font-bold uppercase mb-2">Cumulative GPA</h2>
          <div className="text-6xl font-black bg-white border-4 border-neu-black rounded-xl px-6 py-2 shadow-sm transform rotate-2">
            {knowCgpa ? (results.cumulativeGpa || "-.--") : "N/A"}
          </div>
        </div>
      </div>

      {/* SETTINGS BORDER */}
      <div className={`border-4 border-neu-black rounded-2xl bg-white transition-all duration-300 overflow-hidden ${knowCgpa ? 'shadow-neu' : ''}`}>
        <div className="p-4 bg-gray-50 border-b-4 border-neu-black flex items-center gap-3">
          <input 
            type="checkbox" 
            id="cgpa-check"
            checked={knowCgpa}
            onChange={(e) => setKnowCgpa(e.target.checked)}
            className="w-6 h-6 border-2 border-neu-black rounded text-neu-black focus:ring-neu-yellow transition-all cursor-pointer"
          />
          <label htmlFor="cgpa-check" className="font-black text-lg cursor-pointer uppercase select-none">
            I know my current CGPA
          </label>
        </div>
        
        {/* Expandable Area */}
        {knowCgpa && (
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 animate-in slide-in-from-top-4 duration-300">
            <div>
              <label className="block text-sm font-bold mb-2">Current CGPA</label>
              <input 
                type="number" 
                placeholder="Ex. 3.20"
                step="0.01"
                min="0"
                max="4"
                value={currentCgpa}
                onChange={(e) => setCurrentCgpa(e.target.value)}
                className="w-full bg-white border-2 border-neu-black rounded-lg p-3 font-bold focus:outline-none focus:ring-4 ring-neu-yellow/50"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Total Hours Completed</label>
              <input 
                type="number" 
                placeholder="Ex. 85"
                min="0"
                value={totalCredits}
                onChange={(e) => setTotalCredits(e.target.value)}
                className="w-full bg-white border-2 border-neu-black rounded-lg p-3 font-bold focus:outline-none focus:ring-4 ring-neu-yellow/50"
              />
            </div>
          </div>
        )}
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="bg-red-100 border-4 border-red-500 text-red-700 p-4 rounded-xl font-bold flex items-center gap-3 animate-in shake">
          <AlertCircle size={24} />
          {error}
        </div>
      )}

      {/* CALCULATOR TABLE */}
      <div className="space-y-4">
         {/* Table Header - Hidden on mobile, visible on md */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-2 font-black uppercase text-sm">
          <div className="col-span-6">Course Name <span className="text-gray-400 font-medium normal-case">(Optional)</span></div>
          <div className="col-span-3">Hours</div>
          <div className="col-span-3">Grade</div>
        </div>

        {courses.map((course, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-center">
            
            {/* Mobile Label */}
            <span className="md:hidden font-black text-xs uppercase mt-2">Course {index + 1}</span>

            {/* Name Input */}
            <div className="col-span-12 md:col-span-6">
              <input 
                type="text" 
                placeholder={`Course #${index + 1}`}
                value={course.name}
                onChange={(e) => handleCourseChange(index, 'name', e.target.value)}
                className="w-full bg-gray-50 border-2 border-neu-black rounded-lg p-2.5 font-medium focus:outline-none focus:ring-2 ring-neu-yellow transition-all"
              />
            </div>

            {/* Hours Select */}
            <div className="col-span-6 md:col-span-3">
              <select 
                value={course.hours}
                onChange={(e) => handleCourseChange(index, 'hours', e.target.value)}
                className={`w-full border-2 border-neu-black rounded-lg p-2.5 font-bold focus:outline-none focus:ring-2 ring-neu-yellow appearance-none cursor-pointer ${!course.hours ? 'text-gray-400' : 'text-black bg-white'}`}
              >
                <option value="">Hours...</option>
                {[1, 2, 3, 4].map(h => <option key={h} value={h}>{h} CH</option>)}
              </select>
            </div>

            {/* Grade Select */}
            <div className="col-span-6 md:col-span-3">
              <select 
                value={course.grade}
                onChange={(e) => handleCourseChange(index, 'grade', e.target.value)}
                className={`w-full border-2 border-neu-black rounded-lg p-2.5 font-bold focus:outline-none focus:ring-2 ring-neu-yellow appearance-none cursor-pointer ${!course.grade ? 'text-gray-400' : 'text-black bg-white'}`}
              >
                <option value="">Grade...</option>
                {Object.keys(GRADE_VALUES).map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>
        ))}
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col md:flex-row gap-4 pt-4 border-t-4 border-neu-black">
        <button 
          onClick={clearAll}
          className="flex-1 bg-white text-neu-black py-4 font-bold rounded-xl text-lg border-4 border-neu-black hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
        >
          <Trash2 size={20} /> Reset
        </button>

        <button 
          onClick={calculateGpa}
          className="flex-[2] bg-neu-yellow text-neu-black py-4 font-black rounded-xl text-lg border-4 border-neu-black shadow-neu hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-2"
        >
          <Check size={24} strokeWidth={4} /> Calculate GPA
        </button>
      </div>

    </div>
  );
};

export default GpaCalculator;