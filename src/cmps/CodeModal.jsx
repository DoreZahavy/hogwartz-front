import { useEffect, useState } from "react"
import Loader from "./Loader"

export function CodeModal({login}) {

    const [codeToEdit, setCodeByToEdit] = useState('')
    const [isLoading, setIsLoading] = useState(false)
//   const debouncedSetFilter = useRef(utilService.debounce(onSetFilter, 500))

  useEffect(() => {
    if(codeToEdit.length === 3){
        setIsLoading(true)
        login(codeToEdit)
    }
  }, [codeToEdit])

  function handleChange({ target }) {
    const {  value } = target
    setCodeByToEdit(value)
  }

    return (
        < section className="code-screen" >
          <section className="code-modal">
            <header className="modal-header">

            <h2>Enter code</h2>
            {isLoading && <Loader />}
            </header>
            <input type="text" value={codeToEdit} onChange={handleChange} />
          </section>
        </section >
    )
}
