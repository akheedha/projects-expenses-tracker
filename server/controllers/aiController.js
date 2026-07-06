const { GoogleGenerativeAI } = require("@google/generative-ai");
const pool = require("../db/db");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const bulkImport = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        message: "Expense text is required.",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an API that converts construction expense text into structured JSON.

IMPORTANT RULES

1. Return ONLY a valid JSON array.
2. Do NOT wrap the response inside markdown.
3. Do NOT explain anything.
4. Do NOT add notes.
5. Stop after the JSON array.
6. Categories MUST be one of:
   - Material
   - Labor
   - Machinery
   - Other

Category Guidelines

- Material:
  Cement, steel, bricks, sand, gravel, concrete, tiles, wood, paint, pipes, electrical materials, plumbing materials, glass, gypsum, cables, fittings, etc.

- Labor:
  Electrician wages, plumber wages, carpenter wages, mason wages, painter wages, helper wages, technician wages, supervisor wages, labor payments, salaries, overtime, etc.

- Machinery:
  Excavator rental, crane hire, bulldozer rental, forklift rental, concrete mixer rental, backhoe rental, generator rental, scaffolding rental, tower crane, heavy equipment hire, machinery maintenance, equipment rental, etc.

- Other:
  Fuel, transportation, permits, municipality fees, inspections, office supplies, accommodation, meals, internet, miscellaneous expenses, etc.

Example Output

[
  {
    "description": "Purchased Cement",
    "amount": 3200,
    "category": "Material"
  },
  {
    "description": "Labor Payment",
    "amount": 4500,
    "category": "Labor"
  },
  {
    "description": "Excavator Rental",
    "amount": 5000,
    "category": "Machinery"
  },
  {
    "description": "Fuel",
    "amount": 350,
    "category": "Other"
  }
]

Construction Expenses:

${text}
`;

    const result = await model.generateContent(prompt);

    let response = result.response.text().trim();

    response = response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let expenses;

    try {
      expenses = JSON.parse(response);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response.",
        raw: response,
      });
    }

    return res.json({
      success: true,
      data: expenses,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Gemini request failed.",
      error: error.message,
    });
  }
};

const chatAssistant = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "Question is required.",
      });
    }

    const projects = await pool.query("SELECT * FROM projects");
    const expenses = await pool.query("SELECT * FROM expenses");

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are BuildMetrics AI, an AI assistant for a construction project management system.

Answer ONLY using the project and expense data below.

If the answer cannot be determined from the data, reply exactly:

"I couldn't find that information."

Projects:
${JSON.stringify(projects.rows, null, 2)}

Expenses:
${JSON.stringify(expenses.rows, null, 2)}

User Question:
${question}
`;

    const result = await model.generateContent(prompt);

    const answer = result.response.text();

    return res.json({
      success: true,
      answer,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "AI Assistant failed.",
      error: error.message,
    });
  }
};

module.exports = {
  bulkImport,
  chatAssistant,
};