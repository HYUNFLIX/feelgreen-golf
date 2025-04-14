document.addEventListener('DOMContentLoaded', function() {
    // 탭 기능 구현
    const initTabs = () => {
        const tabButtons = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');
        
        // 탭 클릭 이벤트 처리
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // 모든 탭 버튼의 active 클래스 제거
                tabButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // 모든 탭 콘텐츠 숨기기
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // 클릭된 탭 버튼 활성화
                this.classList.add('active');
                
                // 해당 탭 콘텐츠 표시
                const courseId = this.getAttribute('data-course');
                document.getElementById(`${courseId}-course`).classList.add('active');
            });
        });
    };
    
    // 홀 정보 테이블 하이라이트
    const setupHoleTableHighlight = () => {
        const holeTables = document.querySelectorAll('.hole-table table tbody tr:not(.total)');
        
        holeTables.forEach(row => {
            row.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#e8f5e9';
            });
            
            row.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '';
            });
        });
    };
    
    // 코스 이미지 확대 기능
    const setupImageZoom = () => {
        const courseImages = document.querySelectorAll('.course-image img, .course-map img');
        
        courseImages.forEach(img => {
            img.addEventListener('click', function() {
                // 이미지 확대 모달 생성
                const modal = document.createElement('div');
                modal.className = 'image-modal';
                
                const modalContent = document.createElement('div');
                modalContent.className = 'modal-content';
                
                const closeBtn = document.createElement('span');
                closeBtn.className = 'modal-close';
                closeBtn.innerHTML = '&times;';
                
                const zoomedImg = document.createElement('img');
                zoomedImg.src = this.src;
                
                modalContent.appendChild(closeBtn);
                modalContent.appendChild(zoomedImg);
                modal.appendChild(modalContent);
                
                document.body.appendChild(modal);
                
                // 모달 표시 (약간의 애니메이션 효과 추가)
                setTimeout(() => {
                    modal.style.opacity = '1';
                }, 10);
                
                // 닫기 버튼 이벤트
                closeBtn.addEventListener('click', () => {
                    modal.style.opacity = '0';
                    setTimeout(() => {
                        document.body.removeChild(modal);
                    }, 300);
                });
                
                // 모달 외부 클릭 시 닫기
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        modal.style.opacity = '0';
                        setTimeout(() => {
                            document.body.removeChild(modal);
                        }, 300);
                    }
                });
            });
            
            // 커서 변경으로 클릭 가능함을 표시
            img.style.cursor = 'pointer';
        });
    };
    
    // 함수 실행
    initTabs();
    setupHoleTableHighlight();
    setupImageZoom();
    
    // 이미지 모달 스타일 추가
    const addModalStyles = () => {
        const styleEl = document.createElement('style');
        styleEl.textContent = `
            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                opacity: 0;
                transition: opacity 0.3s ease;
            }
            
            .modal-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }
            
            .modal-content img {
                max-width: 100%;
                max-height: 90vh;
                display: block;
                border: 3px solid white;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
            }
            
            .modal-close {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 36px;
                cursor: pointer;
            }
        `;
        document.head.appendChild(styleEl);
    };
    
    addModalStyles();
});
