import TextGenerator from "../components/TextGenerator";

function TextSummarization() {
    return (
    <div>
        <TextGenerator apiUrl="http://127.0.0.1:5000/api/summarize" actionName="Text Summarization" />
    </div>
    )   
}

export default TextSummarization;