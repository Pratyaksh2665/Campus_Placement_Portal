const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const getJobMatchAnalysis = async (student, job) => {
  const prompt = `
You are an AI assistant for a campus placement portal.

Analyze how well the student's profile matches the given job.

IMPORTANT RULES:
- Base your analysis ONLY on the information provided.
- Do not invent skills, experience, education, or qualifications.
- Do not make the final hiring decision.
- Give a useful comparison between the student's profile and the job.
- Match score must be an integer from 0 to 100.
- Consider skills, experience, education/branch, CGPA if relevant, and job requirements.
- Do not discriminate based on name, gender, age, location, or any other unrelated personal characteristic.

STUDENT PROFILE:
Name: ${student.name || "Not provided"}
Branch: ${student.branch || "Not provided"}
College: ${student.college || "Not provided"}
Year: ${student.year ?? "Not provided"}
CGPA: ${student.cgpa ?? "Not provided"}
Skills: ${
    student.skills?.length ? student.skills.join(", ") : "No skills provided"
  }
Experience: ${student.experience ?? 0} years
Bio: ${student.bio || "Not provided"}

JOB:
Title: ${job.title}
Description: ${job.description}
Requirements: ${
    job.requirements?.length
      ? job.requirements.join(", ")
      : "No specific requirements provided"
  }
Experience Required: ${job.experienceLevel} years
Job Type: ${job.jobType}
Location: ${job.location}

Return ONLY valid JSON in exactly this structure:

{
  "matchScore": 0,
  "matchedSkills": [],
  "missingSkills": [],
  "experienceMatch": true,
  "educationMatch": true,
  "strengths": [],
  "improvements": [],
  "recommendation": ""
}

Rules for the response:
- matchScore must be an integer between 0 and 100.
- matchedSkills must contain skills from the student's profile that are relevant to the job.
- missingSkills must contain important job skills that are not present in the student's profile.
- experienceMatch must be true or false.
- educationMatch must be true or false based only on the provided branch/education information.
- strengths should contain short useful points.
- improvements should contain short useful points.
- recommendation should be a short neutral recommendation such as "Good match" or "Moderate match".
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  const text = response.text;

  if (!text) {
    throw new Error("AI returned an empty response");
  }

  try {
    return JSON.parse(text);
  } catch (error) {
    console.error("Failed to parse AI response:", text);
    throw new Error("AI returned invalid JSON");
  }
};

module.exports = {
  getJobMatchAnalysis,
};
