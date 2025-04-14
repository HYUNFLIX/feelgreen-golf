document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 토글 기능
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // 모바일 메뉴 버튼 생성
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        
        // 헤더에 모바일 메뉴 버튼 추가
        header.insertBefore(mobileMenuBtn, nav);
        
        // 모바일 메뉴 토글 이벤트
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // 아이콘 변경 (메뉴/닫기)
            if (nav.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
    };
    
    // 스크롤 애니메이션
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature, .about-content, .about-image');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };
    
    // 예약 양식 유효성 검사 (예약 페이지용)
    const setupReservationForm = () => {
        const reservationForm = document.getElementById('reservation-form');
        
        if (reservationForm) {
            reservationForm.addEventListener('submit', function(e) {
                const name = document.getElementById('name');
                const phone = document.getElementById('phone');
                const date = document.getElementById('date');
                const time = document.getElementById('time');
                const players = document.getElementById('players');
                
                let isValid = true;
                
                // 필수 입력 확인
                [name, phone, date, time, players].forEach(field => {
                    if (!field.value.trim()) {
                        field.classList.add('error');
                        isValid = false;
                    } else {
                        field.classList.remove('error');
                    }
                });
                
                // 전화번호 형식 확인
                const phonePattern = /^[0-9]{3}-[0-9]{3,4}-[0-9]{4}$/;
                if (phone.value && !phonePattern.test(phone.value)) {
                    phone.classList.add('error');
                    alert('전화번호 형식이 올바르지 않습니다. (예: 010-1234-5678)');
                    isValid = false;
                }
                
                if (!isValid) {
                    e.preventDefault();
                    alert('모든 필수 항목을 올바르게 입력해주세요.');
                }
            });
        }
    };
    
    // 갤러리 이미지 팝업 (갤러리 페이지용)
    const setupGallery = () => {
        const galleryImages = document.querySelectorAll('.gallery-item img');
        
        if (galleryImages.length > 0) {
            // 팝업 요소 생성
            const imagePopup = document.createElement('div');
            imagePopup.className = 'image-popup';
            imagePopup.innerHTML = `
                <div class="popup-content">
                    <span class="close-popup">&times;</span>
                    <img src="" alt="Gallery Image">
                </div>
            `;
            document.body.appendChild(imagePopup);
            
            // 닫기 버튼 이벤트
            const closeBtn = imagePopup.querySelector('.close-popup');
            closeBtn.addEventListener('click', () => {
                imagePopup.style.display = 'none';
            });
            
            // 팝업 외부 클릭 시 닫기
            imagePopup.addEventListener('click', (e) => {
                if (e.target === imagePopup) {
                    imagePopup.style.display = 'none';
                }
            });
            
            // 이미지 클릭 이벤트
            galleryImages.forEach(img => {
                img.addEventListener('click', () => {
                    const popupImg = imagePopup.querySelector('img');
                    popupImg.src = img.src;
                    imagePopup.style.display = 'flex';
                });
            });
        }
    };
    
    // 현재 메뉴 항목 활성화
    const highlightCurrentPage = () => {
        const currentPage = window.location.pathname.split('/').pop();
        const navLinks = document.querySelectorAll('nav ul li a');
        
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    };
    
    // 함수 실행
    if (window.innerWidth < 768) {
        createMobileMenu();
    }
    
    animateOnScroll();
    setupReservationForm();
    setupGallery();
    highlightCurrentPage();
    
    // 창 크기 변경 감지
    window.addEventListener('resize', function() {
        if (window.innerWidth < 768 && !document.querySelector('.mobile-menu-btn')) {
            createMobileMenu();
        }
    });
    
    // 스크롤 시 헤더 스타일 변경
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
});

// 모바일 메뉴 토글 기능 강화
document.addEventListener('DOMContentLoaded', function() {
    // 모바일 메뉴 구현
    const createMobileMenu = () => {
        const header = document.querySelector('header');
        const nav = document.querySelector('nav');
        
        // 이미 모바일 메뉴 버튼이 있는지 확인
        if (document.querySelector('.mobile-menu-btn')) {
            return;
        }
        
        // 모바일 메뉴 버튼 생성
        const mobileMenuBtn = document.createElement('div');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        mobileMenuBtn.style.display = 'none'; // 초기에는 보이지 않음
        
        // 헤더에 모바일 메뉴 버튼 추가
        header.insertBefore(mobileMenuBtn, nav);
        
        // 모바일 메뉴 토글 이벤트
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // 아이콘 변경 (메뉴/닫기)
            if (nav.classList.contains('active')) {
                mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>';
            } else {
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
        });
        
        // 반응형 처리 함수
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                mobileMenuBtn.style.display = 'block';
                nav.classList.remove('active'); // 크기 변경 시 메뉴 닫기
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            } else {
                mobileMenuBtn.style.display = 'none';
                nav.classList.remove('active');
                nav.style.maxHeight = '';
            }
        };
        
        // 초기 실행
        handleResize();
        
        // 창 크기 변경 이벤트
        window.addEventListener('resize', handleResize);
    };
    
    // 메뉴 항목 클릭 시 모바일 메뉴 닫기
    const setupMenuItemClick = () => {
        const menuItems = document.querySelectorAll('nav ul li a');
        const nav = document.querySelector('nav');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        
        menuItems.forEach(item => {
            item.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    nav.classList.remove('active');
                    if (mobileMenuBtn) {
                        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
                    }
                }
            });
        });
    };
    
    // 함수 실행
    createMobileMenu();
    setupMenuItemClick();
    
    // 반응형 스타일시트 추가
    const addResponsiveStyles = () => {
        // 이미 추가된 스타일시트가 있는지 확인
        if (document.getElementById('responsive-styles')) {
            return;
        }
        
        const link = document.createElement('link');
        link.id = 'responsive-styles';
        link.rel = 'stylesheet';
        link.href = 'css/responsive.css';
        document.head.appendChild(link);
    };
    
    // 반응형 스타일 추가
    addResponsiveStyles();
});