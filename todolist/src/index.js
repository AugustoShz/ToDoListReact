import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import './index.css';

export default function App() {

  const [texto, setTexto] = useState('')
  const [itens, setItens] = useState([{id: 1, nome: 'ok'}, {id: 2, nome: 'oi'}, {id: 3, nome: 'olá'}])

  useEffect(() => {
    console.log(texto)
  }, [texto]) // mostra no console sempre que texto for alterado

  function atualizaItens(e){
    var newId = itens.length > 0 ? itens[itens.length-1].id+1 : 1;
    console.log(newId)
    e.preventDefault() // evita a atualização da tela após o submit
    setItens([...itens, {id: newId, nome: texto}]) // add texto aos itens existentes (spread operator)
    setTexto('') // limpa o input
  }

  function deleteItem(id){
    setItens(itens.filter(valor => valor.id !== id))
  }

  function updateItem(id){
    var obj = itens.find((obj => obj.id === id));
    obj.nome = texto;
    setTexto('');
  }
  
  return (
    <div>
      <form onSubmit={atualizaItens} >
        <input type='text' value={texto} onChange={e=>setTexto(e.target.value)} />
        <button type='submit'>Add</button>
      </form>

      <ul>
        {
          itens.map(item => 
            <li key={item.id}>
              {item.nome}
              <button type='button' onClick={e=>deleteItem(item.id)}>Delete</button>
              <button type='button' onClick={e=>updateItem(item.id)}>Update</button>
            </li>
            )
        }
      </ul>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);