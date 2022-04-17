import { useContext, useState } from "react";
import { StorageContext } from './context';
import { MainCanvas, NewPage, NodesTree} from './components';
import { defaultJson } from './defaultJson';

const PAGE_NEW = 0;
const PAGE_EDITOR = 1;

function App() {
  const storage = useContext(StorageContext);
  const [ currentPage, setCurrentPage ] = useState(PAGE_NEW);
  const [ result, setResult ] = useState('');

  const fromJson = json => {
    const result = storage.fromJson(json);
    if (!result) {
      alert("Wrong JSON structure");
      setCurrentPage(PAGE_NEW);
      return;
    }
    setCurrentPage(PAGE_EDITOR);
  }

  return (
    <div>
      <header className="p-3 bg-dark text-white">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <div className="d-flex align-items-center my-2 my-lg-0 me-lg-auto text-white text-decoration-none">
              <span className="fs-4">React Builder</span>
            </div>

            { currentPage === PAGE_EDITOR && (
              <div className="text-end">
                <button className="btn btn-outline-light me-2" onClick={() => setCurrentPage(PAGE_NEW)}>
                  New Page
                </button>
                <button className="btn btn-warning" onClick={() => { setResult(storage.toJson()) }}>Result</button>
              </div>
            )}
          </div>
        </div>
      </header>
      <div className="container mt-5">
        { currentPage === PAGE_NEW && (
          <NewPage defaultJson={ defaultJson } onPageSubmit={json => fromJson(json)} />
        )}
        { currentPage === PAGE_EDITOR && (
          <>
            <div className="row">
              <div className="col-4 position-sticky align-self-start" style={{ top: '40px' }}>
                <div className="card" style={{
                  maxHeight: 'calc(100vh - 120px)',
                  overflow: 'auto'
                }}>
                  <NodesTree />
                </div>
              </div>
              <div className="col-8" style={{ paddingBottom: '80px' }}>
                <MainCanvas />
              </div>
            </div>
            { result !== '' && (
              <>
                <div className="modal fade show" style={{ display: 'block' }}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Result JSON</h5>
                        <button type="button" className="btn-close" onClick={() => { setResult('') }}></button>
                      </div>
                      <div className="modal-body">
                        <textarea 
                          className="form-control" 
                          value={ result } 
                          style={{ minHeight: 'calc(100vh - 155px)' }} 
                          readOnly />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="modal-backdrop fade show" style={{ display: 'block' }}></div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
