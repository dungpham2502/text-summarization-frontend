import TextGenerator from "../components/TextGenerator";

function ParagraphGenerator() {
    return (
        <div>
            <TextGenerator apiUrl="http://127.0.0.1:5000/api/generate" actionName="Generate Paragraph" actionDescription="Enter bulletpoints and our AI model will generate concise and well-structured paragraphs"/>
        </div>
    )
}

export default ParagraphGenerator;