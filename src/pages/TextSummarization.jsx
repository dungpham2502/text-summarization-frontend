import TextGenerator from "../components/TextGenerator";

function TextSummarization() {
    return (
    <div>
        <TextGenerator apiUrl="http://127.0.0.1:5000/api/summarize" actionName="Text Summarization" actionDescription="Enter a long paragraph and Our AI model efficiently condenses text into concise summaries."/>
    </div>
    )   
}

export default TextSummarization;