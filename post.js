document.addEventListener('DOMContentLoaded', () => {
    // Dados simulados
    const posts = [
        { id: 1, title: 'Bem-vindo ao Fórum!', content: 'Esse é o nosso primeiro post.' },
        { id: 2, title: 'Postagem de Exemplo', content: 'Aqui está um exemplo de postagem no fórum.' },
    ];

    // Obter o ID do post da URL
    const params = new URLSearchParams(window.location.search);
    const postId = parseInt(params.get('id'));

    // Encontrar o post correspondente
    const post = posts.find(p => p.id === postId);

    if (post) {
        // Atualizar o conteúdo da página
        document.getElementById('post-title').textContent = post.title;
        document.getElementById('post-body').textContent = post.content;
    } else {
        document.getElementById('post-content').innerHTML = '<p>Post não encontrado!</p>';
    }
});
