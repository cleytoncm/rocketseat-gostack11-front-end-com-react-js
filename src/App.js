import React, { useEffect, useState } from 'react';
import api from './services/api';

import Header from './components/Header';

function App() {
    const [projects, setProjects] = useState([]);

    async function handleAddProject() {
        const response = await api.post('projects', {
            title: `Projeto ${Date.now()}`,
	        owner: "Cleyton de Castro"
        })

        const project = response.data;

        setProjects([...projects, project]);
    }
    /**
     * useEffect (função, [])  => disparada somente uma vez no carregamento do componente
     * useEffect (função, [variavel])  => disparada quando houver alteração da variável
     * [] => conhecido como array de dependencias 
     */
    useEffect(() => {
        api.get('projects').then(response => {
            setProjects(response.data);
        });
    }, []);

    return (
        <>
            <Header title="Projects">
                <ul>
                    {projects.map(project => <li key={project.id}>{project.title}</li>)}
                </ul>
            </Header>

            <button type="button" onClick={handleAddProject}>Adcionar projeto</button>
        </>
    );
}

export default App;