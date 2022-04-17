import { useState } from "react";

const NewPage = ({ defaultJson, onPageSubmit }) => {
    const [jsonField, setJsonField] = useState(defaultJson);
    return (
        <div>
            <label className="form-label h4 mb-3" htmlFor="newPageTextarea">Initial JSON</label>
        	<textarea 
                id="newPageTextarea" 
                className="form-control form-control-sm" 
                onChange={e => setJsonField(e.target.value)} 
                value={jsonField} 
                style={{
                    minHeight: 'calc(100vh - 280px)'
                }}/>
            <div className="mt-3">
                <button className="btn btn-success me-2 btn-lg" onClick={() => onPageSubmit(jsonField)}>Continue</button>
                <button className="btn btn-outline-secondary btn-lg" onClick={() => setJsonField(defaultJson)}>Reset</button>
            </div>
    	</div>
    )
};

export default NewPage;