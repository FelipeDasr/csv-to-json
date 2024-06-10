const socket = io();
let clientId = null;

// Server events
socket.on('connected', async (data) => {
  await socket.emit('ping');
  clientId = data.clientId;
});

socket.on('order:processing', (data) => {
  updateFileStatus(data.processId, 'processing');
});

socket.on('order:done', (data) => {
  showDownloadButton(data.processId, data.jsonFileURL);
});

// Detect file input change
document.getElementById('fileInput').onchange = async (event) => {
  document.getElementById('outputContainer').style.display = 'flex';

  const formData = new FormData();
  formData.append('clientWebsocketId', clientId);
  formData.append('file', event.target.files[0]);

  const response = await fetch('/api/csv-to-json/upload', {
    method: 'POST',
    body: formData,
  });

  document.getElementById('outputContainer').style.display = 'flex';

  const data = await response.json();
  addFileComponent(data.processId, event.target.files[0].name);
};

// File component handling

/**
 * @param {string} processId
 * @param {string} filename
 */
function addFileComponent(processId, filename) {
  const element = document.createElement('div');
  element.className = 'fileBody';
  element.innerHTML = `
    <img src="./assets/file.svg" alt="Ícone de um arquivo" />
    <b class="fileName" title="${filename}">${filename}</b>
    <img id="fileProcessIcon_${processId}" src="./assets/bouncingCircles.svg" alt="Ícone de carregamento" />
    <span class="fileStatus" id="fileStatus_${processId}"></span>
    <div class="downloadButtonContainer">
      <a id="downloadFile_${processId}" class="downloadButton" target="_blank">Baixar</a>
    </div>
  `;

  const filesContainer = document.getElementById('filesContainer');
  filesContainer.insertBefore(element, filesContainer.firstChild);

  updateFileStatus(processId, 'waiting');
}

/**
 * @param {string} processId
 * @param {'waiting' | 'processing' | 'done'} status
 */
function updateFileStatus(processId, status) {
  let statusText = '';
  let iconName = 'bouncingCircles';

  switch (status) {
    case 'waiting':
      statusText = 'Aguardando';
      break;
    case 'processing':
      statusText = 'Processando';
      break;
    case 'done':
      statusText = 'Concluído';
      iconName = 'done';
      break;
  }

  document.getElementById(`fileStatus_${processId}`).innerText = statusText;
  document.getElementById(`fileProcessIcon_${processId}`).src =
    `./assets/${iconName}.svg`;
}

// Download file handling

/**
 *
 * @param {string} processId
 * @param {string} fileUrl
 */
function showDownloadButton(processId, fileUrl) {
  const downloadButton = document.getElementById(`downloadFile_${processId}`);

  downloadButton.style.display = 'block';
  downloadButton.href = fileUrl;

  updateFileStatus(processId, 'done');
}
