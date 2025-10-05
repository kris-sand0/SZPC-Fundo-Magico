function setLoading(isLoading) {
    const btnSpan = document.getElementById('generate-btn');

    if (isLoading) {
        btnSpan.innerHTML = 'Gerando Background...';
    } else {
        btnSpan.innerHTML = 'Gerar Background Mágico';
    }
}

document.addEventListener('DOMContentLoaded', function () {

    const form = document.querySelector('.form-group');
    const textArea = document.getElementById('description');
    const htmlCode = document.getElementById('html-code');
    const cssCode = document.getElementById('css-code');
    const preview = document.getElementById('preview-section');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const description = textArea.value.trim();

        if (!description) {
            return;
        }

        setLoading(true);

        try {

            const response = await fetch('https://kris-sand.app.n8n.cloud/webhook/gerador-fundo', {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify({ description })
            });

            const data = await response.json();
            htmlCode.textContent = data.code || "";
            cssCode.textContent = data.style || "";

            preview.style.display = 'block';
            preview.innerHTML = data.code || "";

            let styleTag = document.getElementById('dynamic-style');

            if (styleTag) styleTag.remove();

            if (data.style) {
                styleTag = document.createElement('style');
                styleTag.id = 'dynamic-style';

                styleTag.textContent = data.style;
                document.head.appendChild(styleTag);
            }

        } catch (error) {
            console.error('Erro ao gerar o fundo:', error);
            htmlCode.textContent = 'Erro ao gerar o HTML. Tente novamente.';
            cssCode.textContent = 'Erro ao gerar o CSS. Tente novamente.';
            preview.innerHTML = '';

        } finally {
            setLoading(false);

        }

    });
});