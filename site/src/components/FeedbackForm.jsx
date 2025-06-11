import { useState } from "react";

export default function FeedbackForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    company: "",
    resumeRating: "",
    passedScreen: "",
    improvements: "",
    standout: "",
    finalThoughts: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://qc88e4b9mh.execute-api.us-east-1.amazonaws.com/prod/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        onSuccess(); // Recruiters will handle the banner + flip
        setFormData({
          company: "",
          resumeRating: "",
          passedScreen: "",
          improvements: "",
          standout: "",
          finalThoughts: "",
        });
      } else {
        alert("Submission failed.");
      }
    } catch (err) {
      alert("Error submitting form.");
    }
  };

  return (
    <form className="flex flex-col gap-4 text-sm" onSubmit={handleSubmit}>
      <label>
        What company are you with?
        <input name="company" value={formData.company} onChange={handleChange} type="text" className="mt-1 w-[95%] mx-auto border border-gray-300 rounded px-3 py-2" />
      </label>

      <label>
        How would you rate my resume overall?
        <select name="resumeRating" value={formData.resumeRating} onChange={handleChange} className="mt-1 w-[95%] mx-auto border border-gray-300 rounded px-3 py-2">
          <option value="">Select</option>
          <option value="excellent">Excellent</option>
          <option value="good">Good</option>
          <option value="average">Average</option>
          <option value="needs_work">Needs Work</option>
        </select>
      </label>

      <label>
        Did I pass your resume screen or interview?
        <select name="passedScreen" value={formData.passedScreen} onChange={handleChange} className="mt-1 w-[95%] mx-auto border border-gray-300 rounded px-3 py-2">
          <option value="">Select</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
          <option value="didnt_review">Didn’t review</option>
        </select>
      </label>

      <label>
        What could I improve?
        <textarea name="improvements" value={formData.improvements} onChange={handleChange} className="mt-1 w-[95%] mx-auto border border-gray-300 rounded px-3 py-2" rows="2" />
      </label>

      <label>
        What stood out to you (positively or negatively)?
        <textarea name="standout" value={formData.standout} onChange={handleChange} className="mt-1 w-[95%] mx-auto border border-gray-300 rounded px-3 py-2" rows="2" />
      </label>

      <label>
        Any final thoughts or advice?
        <textarea name="finalThoughts" value={formData.finalThoughts} onChange={handleChange} className="mt-1 w-[95%] mx-auto border border-gray-300 rounded px-3 py-2" rows="2" />
      </label>

      <div className="mt-1 -mb-1 sm:mb-0 flex justify-center">
        <button
          type="submit"
          className="bg-black text-white rounded-full px-6 py-3 font-semibold hover:bg-gray-800 transition"
        >
          Submit
        </button>
      </div>

    </form>
  );
}