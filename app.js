// app.js
const path = require('path');

document.addEventListener('DOMContentLoaded', () => {
    const postsContainer = document.getElementById('posts-container');

    // Dados simulados
    const posts = [
        { id: 1, title: 'Bem-vindo ao Fórum!', content: 'Esse é o nosso primeiro post.' },
        { id: 2, title: 'Postagem de Exemplo', content: 'Aqui está um exemplo de postagem no fórum.' },
    ];

    // Renderizar os posts
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
           
        `;

        // Adicionar evento de clique ao post inteiro
        postElement.addEventListener('click', () => {
            window.location.href = `post.html?id=${post.id}`;
        });

        postsContainer.appendChild(postElement);
    });

    // Impedir que o clique no botão "Leia Mais" cause problemas (opcional)
    document.querySelectorAll('.view-post').forEach(button => {
        button.addEventListener('click', (e) => {
            e.stopPropagation(); // Impede o clique de se propagar para o elemento pai
        });
    });
});


