import { useState } from "react";
import axios from "axios";

export default function CreateCampaign() {
  const [form, setForm] = useState({
    name: "",
    createdBy: "",
    messageTemplate: "",
    rules: [],
  });
  const [audienceSize, setAudienceSize] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);

  const addRule = () => {
    setForm({
      ...form,
      rules: [...form.rules, { field: "spend", operator: ">", value: "" }],
    });
  };

  const updateRule = (index, key, value) => {
    const rules = [...form.rules];
    rules[index][key] = value;
    setForm({ ...form, rules });
  };

  const removeRule = (index) => {
    const rules = form.rules.filter((_, i) => i !== index);
    setForm({ ...form, rules });
  };

  const previewAudience = async () => {
    try {
      const res = await axios.post(process.env.REACT_APP_API_PREVIEW_URL, {
        rules: form.rules,
      });
      setAudienceSize(res.data.audienceSize);
    } catch (err) {
      alert("Error fetching audience size");
    }
  };

  const generateAI = async () => {
    if (!prompt.trim()) {
      alert("Please enter a prompt for AI to generate messages.");
      return;
    }
    setLoadingAI(true);
    try {
      const res = await axios.post(process.env.REACT_APP_API_AI_GEN_URL, {
        prompt,
      });
      setSuggestions(res.data.suggestions);
    } catch (err) {
      alert("Failed to generate messages");
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(process.env.REACT_APP_API_CAMPAIGNS_URL, form);
    alert("Campaign created!");
    window.location.href = "/campaigns";
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Create Campaign</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Campaign Name"
          className="border p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="text"
          placeholder="Created By (your email)"
          className="border p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, createdBy: e.target.value })}
        />

        <textarea
          placeholder="Message Template (use {{name}} for personalization)"
          value={form.messageTemplate}
          className="border p-2 w-full rounded"
          onChange={(e) => setForm({ ...form, messageTemplate: e.target.value })}
        ></textarea>

        <div>
          <input
            type="text"
            placeholder="Enter AI prompt (e.g. 20% off Diwali sale)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="border p-2 w-full rounded mb-2"
          />
          <button
            type="button"
            className="bg-green-600 text-white px-4 py-2 rounded shadow"
            onClick={generateAI}
          >
            {loadingAI ? "Generating..." : "✨ Generate with AI"}
          </button>

          {suggestions.length > 0 && (
            <div className="space-y-2 mt-4">
              <h3 className="font-semibold">AI Suggestions (click to select):</h3>
              {suggestions.map((s, i) => (
                <div
                  key={i}
                  className="p-3 border rounded bg-gray-50 cursor-pointer hover:bg-gray-100"
                  onClick={() => setForm({ ...form, messageTemplate: s })}
                >
                  {s}
                </div>
              ))}
              <button
                type="button"
                className="bg-gray-200 px-3 py-1 rounded mt-2"
                onClick={generateAI}
              >
                🔄 Regenerate
              </button>
            </div>
          )}
        </div>

        <div>
          <h3 className="font-semibold mb-2">Audience Rules</h3>
          {form.rules.map((rule, i) => (
            <div key={i} className="flex space-x-2 mb-2">
              <select
                value={rule.field}
                onChange={(e) => updateRule(i, "field", e.target.value)}
                className="border p-2 rounded"
              >
                <option value="spend">Spend</option>
                <option value="visits">Visits</option>
                <option value="lastOrderAt">Last Order Date</option>
              </select>
              <select
                value={rule.operator}
                onChange={(e) => updateRule(i, "operator", e.target.value)}
                className="border p-2 rounded"
              >
                <option value=">">&gt;</option>
                <option value="<">&lt;</option>
                <option value="=">=</option>
              </select>
              <input
                type="text"
                placeholder="Value"
                value={rule.value}
                onChange={(e) => updateRule(i, "value", e.target.value)}
                className="border p-2 rounded"
              />
              <button
                type="button"
                className="bg-red-500 text-white px-2 rounded"
                onClick={() => removeRule(i)}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="bg-gray-200 px-3 py-1 rounded"
            onClick={addRule}
          >
            + Add Rule
          </button>
        </div>

        <div>
          <button
            type="button"
            onClick={previewAudience}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Preview Audience
          </button>
          {audienceSize !== null && (
            <p className="mt-2 text-gray-700">
              Estimated Audience Size: <b>{audienceSize}</b>
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded shadow hover:bg-indigo-700"
        >
          Create Campaign
        </button>
      </form>
    </div>
  );
}

