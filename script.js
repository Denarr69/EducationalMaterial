const apiKey = "t-67afbba3d3fac43678f773f7-85e8fdc94b7e4e7c914e3ad7";

async function uploadFile() {
    const fileInput = document.getElementById('fileInput');
    const materialsList = document.getElementById('materials-list');

    if (!fileInput.files.length) {
        alert("Выберите файл!");
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file, file.name); // Добавляем имя файла

    try {
        const response = await fetch("https://api.tatum.io/v3/ipfs", {
            method: "POST",
            headers: {
                "x-api-key": apiKey
            },
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`❌ Ошибка ${response.status}: ${errorText}`);
            alert("Ошибка загрузки! Проверь консоль.");
            return;
        }

        const data = await response.json();
        console.log("✅ Файл загружен! IPFS-хэш:", data.ipfsHash);

        // Создаём ссылку на загруженный файл
        const listItem = document.createElement('li');
        const fileLink = document.createElement('a');
        fileLink.href = `https://ipfs.io/ipfs/${data.ipfsHash}`;
        fileLink.target = "_blank";
        fileLink.textContent = file.name;

        listItem.appendChild(fileLink);
        materialsList.appendChild(listItem);

        alert(`Файл загружен! IPFS-хэш: ${data.ipfsHash}`);
    } catch (error) {
        console.error("❌ Ошибка запроса:", error);
        alert("Ошибка при загрузке файла!");
    }
}
