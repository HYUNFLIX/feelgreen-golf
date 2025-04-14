document.addEventListener('DOMContentLoaded', function() {
    // 교통 탭 기능 구현
    const initDirectionTabs = () => {
        const tabButtons = document.querySelectorAll('.direction-tabs .tab-btn');
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
                const tabId = this.getAttribute('data-tab');
                document.getElementById(`${tabId}-content`).classList.add('active');
            });
        });
    };
    
    // 주소 복사 기능
    const setupCopyAddress = () => {
        const copyButtons = document.querySelectorAll('.copy-btn');
        
        copyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const textToCopy = this.getAttribute('data-text');
                
                // 텍스트 복사 기능
                const textArea = document.createElement('textarea');
                textArea.value = textToCopy;
                textArea.style.position = 'fixed';  // 화면에서 숨기기
                textArea.style.opacity = '0';
                document.body.appendChild(textArea);
                textArea.select();
                
                try {
                    // 클립보드에 복사
                    document.execCommand('copy');
                    
                    // 버튼 텍스트 변경으로 피드백 제공
                    const originalText = this.textContent;
                    this.textContent = '주소가 복사되었습니다!';
                    
                    // 2초 후 원래 텍스트로 복원
                    setTimeout(() => {
                        this.textContent = originalText;
                    }, 2000);
                } catch (err) {
                    console.error('주소 복사 실패:', err);
                    alert('주소를 복사하지 못했습니다. 수동으로 복사해주세요.');
                }
                
                document.body.removeChild(textArea);
            });
        });
    };
    
    // 문의 폼 유효성 검사
    const setupContactForm = () => {
        const form = document.getElementById('contact-form');
        
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // 필수 필드 확인
                const requiredFields = form.querySelectorAll('[required]');
                let isValid = true;
                
                // 에러 메시지 초기화
                const errorMessages = form.querySelectorAll('.error-message');
                errorMessages.forEach(msg => msg.remove());
                
                // 모든 필드의 error 클래스 제거
                const formInputs = form.querySelectorAll('input, select, textarea');
                formInputs.forEach(input => {
                    input.classList.remove('error');
                });
                
                // 필수 필드 검사
                requiredFields.forEach(field => {
                    if (field.type === 'checkbox') {
                        if (!field.checked) {
                            isValid = false;
                            field.parentElement.classList.add('error');
                            addErrorMessage(field.parentElement, '이 항목에 동의해주세요.');
                        }
                    } else if (!field.value.trim()) {
                        isValid = false;
                        field.classList.add('error');
                        addErrorMessage(field, '이 항목은 필수입니다.');
                    }
                });
                
                // 전화번호 형식 검사
                const phoneField = document.getElementById('phone');
                if (phoneField && phoneField.value) {
                    const phonePattern = /^[0-9]{2,3}-[0-9]{3,4}-[0-9]{4}$/;
                    if (!phonePattern.test(phoneField.value)) {
                        isValid = false;
                        phoneField.classList.add('error');
                        addErrorMessage(phoneField, '올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)');
                    }
                }
                
                // 이메일 형식 검사
                const emailField = document.getElementById('email');
                if (emailField && emailField.value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(emailField.value)) {
                        isValid = false;
                        emailField.classList.add('error');
                        addErrorMessage(emailField, '올바른 이메일 형식을 입력해주세요.');
                    }
                }
                
                // 유효성 검사 통과 시 폼 제출
                if (isValid) {
                    // 실제 서버 제출 전 성공 메시지 표시 (데모용)
                    alert('문의가 성공적으로 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.');
                    form.reset();
                    
                    // 실제 서버 제출 코드는 여기에 추가
                    // form.submit();
                }
            });
        }
        
        // 에러 메시지 추가 함수
        function addErrorMessage(element, message) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = message;
            element.parentNode.appendChild(errorDiv);
        }
    };
    
    // 지도 로드 시뮬레이션 (실제 서비스에서는 지도 API 연동 필요)
    const setupMapPlaceholder = () => {
        const mapPlaceholder = document.getElementById('map');
        
        if (mapPlaceholder) {
            // 실제 서비스에서는 이 부분을 API 연동으로 대체
            setTimeout(() => {
                mapPlaceholder.style.backgroundImage = 'url(images/map-placeholder.jpg)';
                mapPlaceholder.style.backgroundSize = 'cover';
                mapPlaceholder.style.backgroundPosition = 'center';
            }, 500);
        }
    };
    
    // 애니메이션 효과
    const setupAnimations = () => {
        // 연락처 카드 순차적 등장 애니메이션
        const infoCards = document.querySelectorAll('.info-card');
        infoCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 200 * index);
        });
        
        // 주변 정보 카드 애니메이션
        const nearbyItems = document.querySelectorAll('.nearby-item');
        
        const nearbyObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 150 * index);
                    
                    nearbyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        nearbyItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            nearbyObserver.observe(item);
        });
    };
    
    // 함수 실행
    initDirectionTabs();
    setupCopyAddress();
    setupContactForm();
    setupMapPlaceholder();
    setupAnimations();
});
