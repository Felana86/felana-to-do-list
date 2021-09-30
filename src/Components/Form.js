import {useState} from 'react';
import Item from './Item';
import {v4 as uuidv4} from 'uuid';


export default function Form() {

    const [dataArr, setDataArr] = useState([
        {txt: "Faire les courses", id: uuidv4()},
        {txt: "Continuer à apprendre React", id: uuidv4()},
        {txt: "Postuler", id: uuidv4()}
    ])

    const [stateInput, setStateInput] = useState();
    
    const deleteElement = id => {
        //console.log(id);
        const filteredState = dataArr.filter(item => {
            return item.id !== id;
        })
        setDataArr(filteredState);
    }

    const addTodo = e => {
        // on prévoit d'éviter la mise à jour du formulaire avec cette méthode
        e.preventDefault();

        // on évite de modifier le tableau du state initial
        // on va préférer créer un nouveau tableau grace au spread operator
        const newArr = [...dataArr];

        // on crée ensuite un nouvel objet qui va accueillir les nouvelles propritétés 
        const newTodo = {};
        newTodo.txt = stateInput;
        newTodo.id = uuidv4();

        // on push les modifs de ce nouvel objet dans le nouveau tableau
        newArr.push(newTodo);
        setDataArr(newArr);

        // on remet à zéro le contenu ou le state de notre input
        setStateInput('');
    }

    // on va lier notre input au nouveau state généré plus tard lors d'un event
    const linkedInput = e => {
        setStateInput(e);

    }

    return (
        
        <div className="m-auto px-4 col-12 col-sm-10 col-lg-6">

            <form onSubmit={e => addTodo(e)} className="mb-3">
                <label htmlFor="todo" 
                className="form-label mt-3">Choses à faire</label>
                <input
                value={stateInput} 
                onInput={e => linkedInput(e.target.value)}
                type="text" 
                className="form-control" 
                id="todo"/>

                <button className="mt-2 btn btn-primary d-block">Envoyez</button>

            </form>

            <h2>Liste des choses à faire : </h2>
            <ul className="list-group">
                {dataArr.map((item) => {
                    return (
                        <Item 
                        txt={item.txt}
                        key={item.id}
                        id={item.id}
                        delFunc={deleteElement}
                        />
                    )
                })}

            </ul>
        </div>
    )
    
}