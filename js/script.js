// Add these variables at the top of your script
let currentPage = 1;
const totalPages = 5;
let currentWalletPage = 1;
const totalWalletPages = 3;

// Add smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({ behavior: 'smooth' });
    });
});

// Handle token burning functionality
document.querySelector('.burn-button').addEventListener('click', async () => {
    const tokenAddress = document.getElementById('tokenAddress').value;
    if (!tokenAddress) {
        alert('Please enter a token address');
        return;
    }
    
    // Add your token burning logic here
    try {
        // Simulate burning animation
        const button = document.querySelector('.burn-button');
        button.style.opacity = '0.7';
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Burning...';
        
        // Reset button after 2 seconds (replace with actual burning logic)
        setTimeout(() => {
            button.style.opacity = '1';
            button.innerHTML = '<i class="fas fa-fire-alt"></i> Burn Tokens';
            alert('Token burning feature coming soon!');
        }, 2000);
    } catch (error) {
        console.error('Error burning tokens:', error);
        alert('Error burning tokens. Please try again.');
    }
});

// Add hover effects for buttons
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('mouseover', () => {
        button.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseout', () => {
        button.style.transform = 'scale(1)';
    });
});

// Show guide modal on page load
window.addEventListener('load', () => {
    setTimeout(() => {
        openGuide();
    }, 500);
});

function openGuide() {
    const modal = document.getElementById('guideModal');
    modal.classList.add('show');
    showPage(1);
    updateNavigation();
    updateGotItButton();
}

function closeGuide() {
    const modal = document.getElementById('guideModal');
    modal.classList.remove('show');
    // Reset to first page when closing
    setTimeout(() => {
        showPage(1);
    }, 300);
}

function showPage(pageNumber) {
    document.querySelectorAll('.guide-page').forEach(page => {
        page.classList.remove('active');
    });
    document.querySelector(`.guide-page[data-page="${pageNumber}"]`).classList.add('active');
    currentPage = pageNumber;
    updateNavigation();
    updateGotItButton();
}

function updateNavigation() {
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    
    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;

    // Update page dots
    const dotsContainer = document.querySelector('.page-dots');
    dotsContainer.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const dot = document.createElement('div');
        dot.className = `page-dot ${i === currentPage ? 'active' : ''}`;
        dot.addEventListener('click', () => showPage(i));
        dotsContainer.appendChild(dot);
    }
}

// Add navigation button listeners
document.querySelector('.prev-button').addEventListener('click', () => {
    if (currentPage > 1) {
        showPage(currentPage - 1);
    }
});

document.querySelector('.next-button').addEventListener('click', () => {
    if (currentPage < totalPages) {
        showPage(currentPage + 1);
    }
});

// Update event listeners
document.querySelector('.got-it-btn').addEventListener('click', () => {
    if (currentPage === totalPages) {
        closeGuide();
    }
});

// Update the click outside behavior to only work when on the last page
window.addEventListener('click', (e) => {
    const modal = document.getElementById('guideModal');
    if (e.target === modal && currentPage === totalPages) {
        closeGuide();
    }
});

function updateGotItButton() {
    const gotItBtn = document.querySelector('.got-it-btn');
    const progress = (currentPage / totalPages) * 100;
    
    // Calculate color gradient from grey to green based on progress
    const startColor = {r: 102, g: 102, b: 102}; // #666666
    const endColor = {r: 76, g: 175, b: 80};     // #4CAF50
    
    const currentColor = {
        r: Math.round(startColor.r + (endColor.r - startColor.r) * (currentPage / totalPages)),
        g: Math.round(startColor.g + (endColor.g - startColor.g) * (currentPage / totalPages)),
        b: Math.round(startColor.b + (endColor.b - startColor.b) * (currentPage / totalPages))
    };
    
    gotItBtn.style.backgroundColor = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
    
    if (currentPage === totalPages) {
        gotItBtn.disabled = false;
        gotItBtn.textContent = 'Got it! (100%)';
    } else {
        gotItBtn.disabled = true;
        gotItBtn.textContent = `Continue... (${progress}%)`;
    }
}

// Add these new functions
function openWalletGuide() {
    const modal = document.getElementById('walletModal');
    modal.classList.add('show');
    showWalletPage(1);
    updateWalletNavigation();
    updateConnectButton();
}

function closeWalletGuide() {
    const modal = document.getElementById('walletModal');
    modal.classList.remove('show');
    setTimeout(() => {
        showWalletPage(1);
    }, 300);
}

function showWalletPage(pageNumber) {
    const pages = document.querySelectorAll('#walletModal .guide-page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.querySelector(`#walletModal .guide-page[data-page="${pageNumber}"]`).classList.add('active');
    currentWalletPage = pageNumber;
    updateWalletNavigation();
    updateConnectButton();
}

function updateWalletNavigation() {
    const prevButton = document.querySelector('#walletModal .prev-button');
    const nextButton = document.querySelector('#walletModal .next-button');
    
    prevButton.disabled = currentWalletPage === 1;
    nextButton.disabled = currentWalletPage === totalWalletPages;

    const dotsContainer = document.querySelector('#walletModal .page-dots');
    dotsContainer.innerHTML = '';
    
    for (let i = 1; i <= totalWalletPages; i++) {
        const dot = document.createElement('div');
        dot.className = `page-dot ${i === currentWalletPage ? 'active' : ''}`;
        dot.addEventListener('click', () => showWalletPage(i));
        dotsContainer.appendChild(dot);
    }
}

function updateConnectButton() {
    const connectBtn = document.querySelector('.connect-wallet-btn');
    const progress = (currentWalletPage / totalWalletPages) * 100;
    
    const startColor = {r: 102, g: 102, b: 102}; // #666666
    const endColor = {r: 76, g: 175, b: 80};     // #4CAF50
    
    const currentColor = {
        r: Math.round(startColor.r + (endColor.r - startColor.r) * (currentWalletPage / totalWalletPages)),
        g: Math.round(startColor.g + (endColor.g - startColor.g) * (currentWalletPage / totalWalletPages)),
        b: Math.round(startColor.b + (endColor.b - startColor.b) * (currentWalletPage / totalWalletPages))
    };
    
    connectBtn.style.backgroundColor = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
    
    if (currentWalletPage === totalWalletPages) {
        connectBtn.disabled = false;
        connectBtn.textContent = 'Connect Wallet';
    } else {
        connectBtn.disabled = true;
        connectBtn.textContent = `Continue... (${Math.round(progress)}%)`;
    }
}

// Add event listeners
document.querySelector('.connect-wallet-nav-btn').addEventListener('click', openWalletGuide);

document.querySelector('#walletModal .prev-button').addEventListener('click', () => {
    if (currentWalletPage > 1) {
        showWalletPage(currentWalletPage - 1);
    }
});

document.querySelector('#walletModal .next-button').addEventListener('click', () => {
    if (currentWalletPage < totalWalletPages) {
        showWalletPage(currentWalletPage + 1);
    }
});

document.querySelector('.connect-wallet-btn').addEventListener('click', () => {
    if (currentWalletPage === totalWalletPages) {
        // Add your wallet connection logic here
        closeWalletGuide();
        // Example: connectWallet();
    }
});

// Update the click outside behavior for wallet modal
window.addEventListener('click', (e) => {
    const walletModal = document.getElementById('walletModal');
    if (e.target === walletModal && currentWalletPage === totalWalletPages) {
        closeWalletGuide();
    }
});

// Add this JavaScript for FAQ functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Toggle current FAQ item
        if (!isActive) {
            faqItem.classList.add('active');
            
            // Scroll the answer into view with offset for footer
            setTimeout(() => {
                const answer = faqItem.querySelector('.faq-answer');
                const footerHeight = document.querySelector('footer').offsetHeight;
                const offset = 100; // Additional offset for better visibility
                
                window.scrollTo({
                    top: answer.offsetTop - window.innerHeight + answer.offsetHeight + footerHeight + offset,
                    behavior: 'smooth'
                });
            }, 300); // Wait for animation to start
        }
    });
}); 