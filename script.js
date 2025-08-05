document.addEventListener('DOMContentLoaded', () => {
    const paymentTimerElement = document.getElementById('payment-timer');
    const countdownElement = document.getElementById('countdown');
    const qrCodeElement = document.getElementById('qr-code');

    let countdown = 60;
    let timerInterval;
    let qrRefreshInterval;

    function updateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        paymentTimerElement.textContent = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

    function updateCountdown() {
        countdown--;
        countdownElement.textContent = countdown;

        if (countdown <= 0) {
            // 刷新二维码（这里只是模拟，实际应用中会调用API）
            qrCodeElement.src = `qr-code-image.png?t=${new Date().getTime()}`;
            countdown = 60;
            countdownElement.textContent = countdown;
        }
    }

    // 页面加载时立即更新时间
    updateTime();
    // 每秒更新时间
    timerInterval = setInterval(updateTime, 1000);

    // 每秒更新倒计时
    updateCountdown();
    qrRefreshInterval = setInterval(updateCountdown, 1000);

    // 刷新按钮点击事件
    document.querySelector('.refresh-button').addEventListener('click', () => {
        clearInterval(qrRefreshInterval);
        // 立即刷新二维码
        qrCodeElement.src = `qr-code-image.png?t=${new Date().getTime()}`;
        countdown = 60;
        countdownElement.textContent = countdown;
        // 重新启动倒计时
        qrRefreshInterval = setInterval(updateCountdown, 1000);
    });
});