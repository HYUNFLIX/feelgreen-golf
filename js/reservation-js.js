document.addEventListener('DOMContentLoaded', function() {
    // 요금 탭 기능 구현
    const initPriceTabs = () => {
        const tabButtons = document.querySelectorAll('.price-tabs .tab-btn');
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
    
    // FAQ 기능 구현
    const initFaqs = () => {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            const toggleIcon = item.querySelector('.toggle-icon i');
            
            question.addEventListener('click', function() {
                // 현재 FAQ 아이템이 활성화되어 있는지 확인
                const isActive = item.classList.contains('active');
                
                // 모든 FAQ 닫기
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                    faqItem.querySelector('.toggle-icon i').className = 'fas fa-plus';
                });
                
                // 현재 FAQ가 이미 활성화되어 있지 않았다면 열기
                if (!isActive) {
                    item.classList.add('active');
                    toggleIcon.className = 'fas fa-times';
                }
            });
        });
    };
    
    // 예약 폼 유효성 검사
    const setupReservationForm = () => {
        const form = document.getElementById('reservation-form');
        
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
                
                // 이메일 형식 검사 (선택적)
                const emailField = document.getElementById('email');
                if (emailField && emailField.value) {
                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailPattern.test(emailField.value)) {
                        isValid = false;
                        emailField.classList.add('error');
                        addErrorMessage(emailField, '올바른 이메일 형식을 입력해주세요.');
                    }
                }
                
                // 날짜 유효성 검사 (오늘 이후의 날짜만 선택 가능)
                const dateField = document.getElementById('date');
                if (dateField && dateField.value) {
                    const selectedDate = new Date(dateField.value);
                    const today = new Date();
                    today.setHours(0, 0, 0, 0);
                    
                    if (selectedDate < today) {
                        isValid = false;
                        dateField.classList.add('error');
                        addErrorMessage(dateField, '오늘 이후의 날짜를 선택해주세요.');
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
    
    // 현재 날짜 이후의 날짜만 선택 가능하도록 설정
    const setupDateField = () => {
        const dateField = document.getElementById('date');
        
        if (dateField) {
            // 오늘 날짜 가져오기
            const today = new Date();
            
            // YYYY-MM-DD 형식으로 변환
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            
            const formattedDate = `${year}-${month}-${day}`;
            
            // 최소 날짜를 오늘로 설정
            dateField.setAttribute('min', formattedDate);
        }
    };
    
    // 애니메이션 효과
    const setupAnimations = () => {
        // 방법 카드 순차적 등장 애니메이션
        const methods = document.querySelectorAll('.method');
        methods.forEach((method, index) => {
            method.style.opacity = '0';
            method.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                method.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                method.style.opacity = '1';
                method.style.transform = 'translateY(0)';
            }, 200 * index);
        });
        
        // 프로세스 단계 순차적 등장 애니메이션
        const steps = document.querySelectorAll('.step');
        
        const stepObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, 150 * index);
                    
                    stepObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        steps.forEach(step => {
            step.style.opacity = '0';
            step.style.transform = 'translateY(20px)';
            step.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            stepObserver.observe(step);
        });
    };
    
    // 함수 실행
    initPriceTabs();
    initFaqs();
    setupReservationForm();
    setupDateField();
    setupAnimations();
});
