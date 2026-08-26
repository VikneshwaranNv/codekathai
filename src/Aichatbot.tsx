import { useState } from "react";

export default function CodeKathaiAIChat() {
    const [message, setMessage] = useState("");
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!message.trim() || loading) return;

        setLoading(true);

        try {
            const response = await fetch(
                "http://localhost:5678/webhook/b23e1f73-210d-4f5a-aafd-bc3411623adf/chat",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        chatInput: message,
                    }),
                }
            );

            if (!response.ok) {
              setReply("Unable to connect to AI Tutor right now. Please try again.");
              return;
            }

            const data = await response.json();

            setReply(
                data.output ||
                data.text ||
                data.response ||
                "I received your message, but no reply was returned."
            );

            setMessage("");
        } catch (error) {
            console.error(error);
            setReply(
                "Unable to connect to the AI Tutor. Make sure your n8n workflow is running."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: "30px", maxWidth: "800px", margin: "auto" }}>
            <h1>🤖 Code Kathai AI Tutor</h1>

            <p>Ask me anything about programming.</p>

            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask your programming question..."
                rows={5}
                style={{ width: "100%", padding: "12px" }}
            />

            <button
                onClick={sendMessage}
                disabled={loading}
                style={{
                    marginTop: "12px",
                    padding: "10px 20px",
                    cursor: loading ? "not-allowed" : "pointer",
                }}
            >
                {loading ? "Thinking..." : "Send"}
            </button>

            {reply && (
                <div style={{ marginTop: "25px" }}>
                    <h3>AI Tutor</h3>
                    <div
                        style={{
                            padding: "15px",
                            borderRadius: "8px",
                            background: "#f3f3f3",
                            whiteSpace: "pre-wrap",
                        }}
                    >
                        {reply}
                    </div>
                </div>
            )}
        </div>
    );
}