const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
const file = document.getElementById('fileupload');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let audioSource;
let analyser;

container.addEventListener('click', function(){
    const audio1 = document.getElementById('audio1');
    const audioContext = new AudioContext();
    audio1.play();
    audioSource = audioContext.createMediaElementSource(audio1);
    analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = (canvas.width/2)/bufferLength;
    let barHeight;
    let x;

    function animate(){
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);
    }
    animate();
});

file.addEventListener('change', function(){
    // console.log(this.files);
    const files = this.files;
    const audio1 = document.getElementById('audio1');
    audio1.src = URL.createObjectURL(files[0]);
    audio1.load();
    audio1.play();

    audioSource = audioContext.createMediaElementSource(audio1);
    analyser = audioContext.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioContext.destination);
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const barWidth = (canvas.width/2)/bufferLength;
    let barHeight;
    let x;

    function animate(){
        x = 0;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray);
        requestAnimationFrame(animate);
    }
    animate();
});

function drawVisualiser(bufferLength, x, barWidth, barHeight, dataArray){
    // bellagio view
    // for(let i = 0; i < bufferLength; i++){
    //     barHeight = dataArray[i];
    //     const red = i / 2;
    //     const green = dataArray[i];
    //     const blue = dataArray[i] * i / 2;
    //     ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
    //     ctx.fillRect(canvas.width/2 - x, canvas.height - barHeight, barWidth, barHeight);
    //     x += barWidth;
    // }
    // for(let i = 0; i < bufferLength; i++){
    //     barHeight = dataArray[i];
    //     const red = i / 2;
    //     const green = dataArray[i];
    //     const blue = dataArray[i] * i / 2;
    //     ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
    //     ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
    //     x += barWidth;
    // }

    // sun view
    // for(let i = 0; i < bufferLength; i++){
    //     barHeight = dataArray[i];
    //     ctx.save();
    //     ctx.translate(canvas.width/2, canvas.height/2);
    //     ctx.rotate(i + Math.PI * 2 / bufferLength);
    //     const red = dataArray[i] * 100;
    //     const green = i * 1.5;
    //     const blue = dataArray[i] / 2;
    //     ctx.fillStyle = 'rgb(' + red + ',' + green + ',' + blue + ')';
    //     ctx.fillRect(0, 0, barWidth, barHeight);
    //     x += barWidth;
    //     ctx.restore();
    // }
    
    // firework view
    // for(let i = 0; i < bufferLength; i++){
    //     barHeight = dataArray[i];
    //     ctx.save();
    //     ctx.translate(canvas.width/2, canvas.height/2);
    //     ctx.rotate(i * Math.PI * 360 / bufferLength);
    //     const hue = i * 15;
    //     ctx.fillStyle = 'hsl(' + hue + ',100%, 50%)';
    //     ctx.fillRect(0, 0, barWidth, barHeight);
    //     x += barWidth;
    //     ctx.restore();
    // }

    // black hole view
    for(let i = 0; i < bufferLength; i++){
        barHeight = dataArray[i] * 2;
        ctx.save();
        ctx.translate(canvas.width/2, canvas.height/2);
        const hue = i * 15;
        ctx.strokeStyle = 'hsl(' + hue + ',50%, 50%)';
        ctx.beginPath();
        ctx.arc(0, 0, barHeight*1.5, 0, Math.PI * 2);
        ctx.stroke();
        x += barWidth;

        ctx.restore();
    }
}