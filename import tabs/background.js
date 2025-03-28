const groups = {
    "MAHOU PROD (blue)": [
        "https://acceso.mahou-sanmiguel.com/oauth2/v1/authorize?client_id=okta.2b1959c8-bcc0-56eb-a589-cfcfb7422f26&code_challenge=QgYs2Nl-HX7Iek7dAeNgBiDy8rRtg8rGMHTyuRiu8O8&code_challenge_method=S256&nonce=JHaIRCcuxsN5Fi0iTAyswRCQVMSVUiqULXq169tQ6HqBcy35eaGuhBPaIpeTKHw7&redirect_uri=https%3A%2F%2Facceso.mahou-sanmiguel.com%2Fenduser%2Fcallback&response_type=code&state=3oC9Dc1O8eqYaFOXbeayGPS5rTiiqOl4gKafVxPsUSppVtUT4rSvR86jFuUWggLP&scope=openid%20profile%20email%20okta.users.read.self%20okta.users.manage.self%20okta.internal.enduser.read%20okta.internal.enduser.manage%20okta.enduser.dashboard.read%20okta.enduser.dashboard.manage%20okta.myAccount.sessions.manage",
        "https://docs.google.com/document/d/1eHwBI_c6iz1rtRWrddsBmtdI2G1GmQ4wbeBjpaHVQz8/edit?pli=1&tab=t.0#heading=h.v1cxiswljdo6"
    ],
    "ATLAS (grey)": [
        "https://mail.google.com/mail/u/0/#inbox",
        "https://app.sesametime.com/employee/portal",
        "https://timekeeper.atlascloud.es/timesheet?type=week&start=2025-03-24&end=2025-03-30"
    ],
    "FOF (green)": [
        "https://focusonforce.com/certification-courses/",
        "https://focusonforce.com/exams/data-and-analytics-management-objectives-3-4-5-admin/"
    ],
    "MAHOU UAT (yellow)": [
        "https://mahousanmiguel--full.sandbox.my.salesforce.com/secur/forgotpassword.jsp?locale=es"
    ],
    "MAHOU DEV (red)": [
        "https://mahousanmiguel--dev.sandbox.my.site.com/Acceso?startURL=%2FUniversoMahou%2FMHInicio%3Flogin%3Dtrue"
    ]
};

function openGroupedTabs() {
    Object.entries(groups).forEach(([groupName, urls]) => {
        urls.forEach((url, index) => {
            chrome.tabs.create({ url, active: index === 0 });
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("openTabs").addEventListener("click", openGroupedTabs);
});