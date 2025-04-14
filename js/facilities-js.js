document.addEventListener('DOMContentLoaded', function() {
    // 갤러리 모달 기능 구현
    const setupGallery = () => {
        const galleryItems = document.querySelectorAll('.gallery-item');
        
        // 모달 요소 생성
        const createGalleryModal = () => {
            const modal = document.createElement('div');
            modal.className = 'gallery-modal';
            
            const modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            
            const closeBtn = document.createElement('span');
            closeBtn.className = 'modal-close';
            closeBtn.innerHTML = '&times;';
            
            const modalImg = document.createElement('img');
            modalImg.alt = 'Gallery Image';
            
            const modalCaption = document.createElement('div');
            modalCaption.className = 'modal-caption';
            
            const modalNav = document.createElement('div');
            modalNav.className = 'modal-nav';
            
            const prevBtn = document.createElement('button');
            prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
            prevBtn.className = 'prev-btn';
            
            const nextBtn = document.createElement('button');
            nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
            nextBtn.className = 'next-btn';
            
            modalNav.appendChild(prevBtn);
            modalNav.appendChild(nextBtn);
            
            modalContent.appendChild(closeBtn);
            modalContent.appendChild(modalImg);
            modalContent.appendChild(modalCaption);
            modalContent.appendChild(modalNav);
            
            modal.appendChild(modalContent);
            document.body.appendChild(modal);
            
            return {
                modal,
                modalImg,
                modalCaption,
                closeBtn,
                prevBtn,
                nextBtn
            };
        };
        
        // 모달 요소들 가져오기
        const modalElements = createGalleryModal();
        const { modal, modalImg, modalCaption, closeBtn, prevBtn, nextBtn } = modalElements;
        
        // 현재 활성화된 이미지 인덱스
        let currentIndex = 0;
        
        // 이미지 표시 함수
        const showImage = (index) => {
            const item = galleryItems[index];
            const img = item.querySelector('img');
            const caption = item.querySelector('.caption');
            
            modalImg.src = img.src;
            modalCaption.textContent = caption.textContent;
            currentIndex = index;
        };
        
        // 모달 열기 함수
        const openModal = (index) => {
            showImage(index);
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // 스크롤 방지
        };
        
        // 모달 닫기 함수
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // 스크롤 복원
        };
        
        // 이전 이미지 표시
        const showPrevImage = () => {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            showImage(currentIndex);
        };
        
        // 다음 이미지 표시
        const showNextImage = () => {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            showImage(currentIndex);
        };
        
        // 이벤트 리스너 등록
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => openModal(index));
        });
        
        closeBtn.addEventListener('click', closeModal);
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        prevBtn.addEventListener('click', showPrevImage);
        nextBtn.addEventListener('click', showNextImage);
        
        // 키보드 이벤트 처리
        document.addEventListener('keydown', (e) => {
            if (!modal.classList.contains('active')) return;
            
            if (e.key === 'Escape') {
                closeModal();
            } else if (e.key === 'ArrowLeft') {
                showPrevImage();
            } else if (e.key === 'ArrowRight') {
                showNextImage();
            }
        });
    };
    
    // 시설 소개 애니메이션 효과
    const setupFacilityAnimations = () => {
        const facilities = document.querySelectorAll('.facility');
        const services = document.querySelectorAll('.service');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                    // 한 번 애니메이션이 실행된 후에는 감시 중단
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // 시설 요소 관찰 시작
        facilities.forEach(facility => {
            facility.style.opacity = '0';
            facility.style.transform = 'translateY(30px)';
            facility.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(facility);
        });
        
        // 서비스 요소 관찰 시작
        services.forEach(service => {
            service.style.opacity = '0';
            service.style.transform = 'translateY(30px)';
            service.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(service);
        });
        
        // 애니메이션 효과 적용
        document.addEventListener('animationend', function(e) {
            if (e.target.classList.contains('animate')) {
                e.target.style.opacity = '1';
                e.target.style.transform = 'translateY(0)';
            }
        });
    };
    
    // 운영 시간 카드 호버 효과
    const setupHoursCardHover = () => {
        const hoursCards = document.querySelectorAll('.hours-card');
        
        hoursCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
                this.style.transition = 'transform 0.3s ease, box-shadow 0.3s ease';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
            });
        });
    };
    
    // 함수 실행
    setupGallery();
    setupFacilityAnimations();
    setupHoursCardHover();
    
    // 애니메이션 클래스 추가 함수
    const addAnimateClass = (element) => {
        element.classList.add('animate');
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
    };
    
    // 페이지 로드 시 첫 번째 시설에 애니메이션 적용
    setTimeout(() => {
        const firstFacility = document.querySelector('.facility');
        if (firstFacility) {
            addAnimateClass(firstFacility);
        }
    }, 300);
});
