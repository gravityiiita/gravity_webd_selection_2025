const form = document.getElementById('signupForm');
const emailEl = document.getElementById('email');
const pwEl = document.getElementById('password');
const confirmEl = document.getElementById('confirmPassword');
const toggleBtn = document.getElementById('toggleBtn');


const submitBtn = document.getElementById('submitBtn');


const emailFeedback = document.getElementById('emailFeedback');
const pwFeedback = document.getElementById('passwordFeedback');
const confirmFeedback = document.getElementById('confirmFeedback');


function validEmail(v){
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function validPassword(v){
// min 8, at least 1 number and 1 special char
return /(?=.{8,})(?=.*\d)(?=.*[!@#$%^&*()_+\-={}\[\]:";'<>?,.\/]).*/.test(v);
}


emailEl.addEventListener('input',()=>{
const v = emailEl.value.trim();
if(!v){ emailFeedback.textContent=''; emailFeedback.className='feedback'; return }
if(validEmail(v)) { emailFeedback.textContent='Looks good'; emailFeedback.className='feedback ok' }
else { emailFeedback.textContent='Please enter a valid email'; emailFeedback.className='feedback error' }
toggleSubmitState();
});


pwEl.addEventListener('input',()=>{
const v = pwEl.value;
if(!v){ pwFeedback.textContent=''; pwFeedback.className='feedback'; return }
if(validPassword(v)) { pwFeedback.textContent='Strong password'; pwFeedback.className='feedback ok' }
else { pwFeedback.textContent='Password must be 8+ chars with a number and special char'; pwFeedback.className='feedback error' }
validateConfirm();
toggleSubmitState();
});


confirmEl.addEventListener('input',()=>{ validateConfirm(); toggleSubmitState(); });


function validateConfirm(){
if(!confirmEl.value){ confirmFeedback.textContent=''; confirmFeedback.className='feedback'; return }
if(confirmEl.value === pwEl.value) { confirmFeedback.textContent='Passwords match'; confirmFeedback.className='feedback ok' }
else { confirmFeedback.textContent='Passwords do not match'; confirmFeedback.className='feedback error' }
}



toggleBtn.addEventListener('click',()=>{
const type = pwEl.type === 'password' ? 'text' : 'password';
pwEl.type = type; confirmEl.type = type;
toggleBtn.textContent = type === 'text' ? 'Hide' : 'Show';
});


function toggleSubmitState(){
const ok = validEmail(emailEl.value.trim()) && validPassword(pwEl.value) && (pwEl.value === confirmEl.value);
submitBtn.disabled = !ok;
}


form.addEventListener('submit', e=>{
e.preventDefault();

if(submitBtn.disabled) return;

submitBtn.textContent = 'Creating…';
submitBtn.disabled = true;
setTimeout(()=>{
submitBtn.textContent = 'Created ✓';
form.reset();
emailFeedback.textContent=''; pwFeedback.textContent=''; confirmFeedback.textContent='';
setTimeout(()=>{ submitBtn.textContent='Create account'; submitBtn.disabled=false },1200);
},1000);
});