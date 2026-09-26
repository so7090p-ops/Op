/* =================================================
   بيانات التقرير
================================================= */

const data = {

    school:
        "متوسطة وثانوية ربيق",

    program:
        "مبادرة «ورد وأثر»",

    date:
        "٣ / ٤ / ١٤٤٨هـ",

    period:
        "٤ أسابيع",

    target:
        "طالبات المدرسة",

    teacher:
        "سلطانه مسلط – نورة سعد",

    principal:
        "ترفه الحميداني"

};


/* =================================================
   رابط الشواهد QR
================================================= */

const evidenceURL =
    "https://drive.google.com/drive/folders/1gY-KnfhZqUZYd5Pa3u6XrXuoFRspwVXl";


/* =================================================
   تشغيل QR
================================================= */

function createQRCode() {

    const container =
        document.getElementById("qrcode");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (
        typeof QRCode ===
        "undefined"
    ) {

        container.innerHTML =
            "<span style='font-size:8px'>تعذر تحميل QR</span>";

        return;

    }


    new QRCode(
        container,
        {

            text: evidenceURL,

            width: 70,

            height: 70,

            correctLevel:
                QRCode.CorrectLevel.H

        }
    );

}


/* =================================================
   فتح نافذة التعديل
================================================= */

function openEditor() {

    document.getElementById(
        "editSchool"
    ).value =
        data.school;


    document.getElementById(
        "editProgram"
    ).value =
        data.program;


    document.getElementById(
        "editDate"
    ).value =
        data.date;


    document.getElementById(
        "editPeriod"
    ).value =
        data.period;


    document.getElementById(
        "editTarget"
    ).value =
        data.target;


    document.getElementById(
        "editIdea"
    ).value =
        getCleanText(
            document.getElementById(
                "ideaContent"
            )
        );


    document.getElementById(
        "editImportance"
    ).value =
        getCleanText(
            document.getElementById(
                "importanceContent"
            )
        );


    document.getElementById(
        "editTeacher"
    ).value =
        data.teacher;


    document.getElementById(
        "editPrincipal"
    ).value =
        data.principal;


    loadPreview(
        "teacher"
    );


    loadPreview(
        "principal"
    );


    document.getElementById(
        "editorModal"
    ).classList.add("show");

}


/* =================================================
   إغلاق نافذة التعديل
================================================= */

function closeEditor() {

    document.getElementById(
        "editorModal"
    ).classList.remove("show");

}


/* =================================================
   تنظيف النص
================================================= */

function getCleanText(element) {

    if (!element) {
        return "";
    }


    return element.innerText
        .replace(/\n{3,}/g, "\n\n")
        .trim();

}


/* =================================================
   حفظ التعديلات
================================================= */

function saveChanges() {


    data.school =
        document.getElementById(
            "editSchool"
        ).value.trim();


    data.program =
        document.getElementById(
            "editProgram"
        ).value.trim();


    data.date =
        document.getElementById(
            "editDate"
        ).value.trim();


    data.period =
        document.getElementById(
            "editPeriod"
        ).value.trim();


    data.target =
        document.getElementById(
            "editTarget"
        ).value.trim();


    data.teacher =
        document.getElementById(
            "editTeacher"
        ).value.trim();


    data.principal =
        document.getElementById(
            "editPrincipal"
        ).value.trim();


    const idea =
        document.getElementById(
            "editIdea"
        ).value.trim();


    const importance =
        document.getElementById(
            "editImportance"
        ).value.trim();


    /* تحديث الصفحة */

    document.getElementById(
        "schoolName"
    ).textContent =
        data.school;


    document.getElementById(
        "programName"
    ).textContent =
        data.program;


    document.getElementById(
        "titleProgram"
    ).textContent =
        data.program.replace(
            "مبادرة",
            ""
        ).trim();


    document.getElementById(
        "programDate"
    ).textContent =
        data.date;


    document.getElementById(
        "programPeriod"
    ).textContent =
        data.period;


    document.getElementById(
        "targetGroup"
    ).textContent =
        data.target;


    document.getElementById(
        "teacherName"
    ).textContent =
        data.teacher;


    document.getElementById(
        "principalName"
    ).textContent =
        data.principal;


    document.getElementById(
        "ideaContent"
    ).innerHTML =
        formatText(
            idea
        );


    document.getElementById(
        "importanceContent"
    ).innerHTML =
        formatText(
            importance
        );


    saveLocal();


    closeEditor();

}


/* =================================================
   تحويل النص إلى HTML
================================================= */

function formatText(text) {

    return escapeHtml(text)
        .replace(
            /\n/g,
            "<br>"
        );

}


/* =================================================
   حماية النص
================================================= */

function escapeHtml(text) {

    return String(
        text || ""
    )

    .replace(
        /&/g,
        "&amp;"
    )

    .replace(
        /</g,
        "&lt;"
    )

    .replace(
        />/g,
        "&gt;"
    )

    .replace(
        /"/g,
        "&quot;"
    )

    .replace(
        /'/g,
        "&#039;"
    );

}


/* =================================================
   رفع صورة التوقيع
================================================= */

function uploadSignature(type) {


    let input;

    let image;

    let text;

    let preview;


    if (
        type ===
        "teacher"
    ) {

        input =
            document.getElementById(
                "teacherSignatureInput"
            );


        image =
            document.getElementById(
                "teacherSignature"
            );


        text =
            document.getElementById(
                "teacherSignatureText"
            );


        preview =
            document.getElementById(
                "teacherPreview"
            );

    }

    else {

        input =
            document.getElementById(
                "principalSignatureInput"
            );


        image =
            document.getElementById(
                "principalSignature"
            );


        text =
            document.getElementById(
                "principalSignatureText"
            );


        preview =
            document.getElementById(
                "principalPreview"
            );

    }


    if (
        !input.files ||
        !input.files[0]
    ) {

        return;

    }


    const file =
        input.files[0];


    const reader =
        new FileReader();


    reader.onload =
        function(event) {


            const imageData =
                event.target.result;


            /* عرض التوقيع في التقرير */

            image.src =
                imageData;


            image.style.display =
                "block";


            text.style.display =
                "none";


            /* المعاينة داخل النافذة */

            preview.innerHTML = `

                <img
                    src="${imageData}"
                    alt="معاينة التوقيع">

            `;


            /* الحفظ */

            localStorage.setItem(

                type ===
                "teacher"

                ? "teacherSignature"

                : "principalSignature",

                imageData

            );

        };


    reader.readAsDataURL(file);

}


/* =================================================
   تحميل التوقيعات
================================================= */

function loadSignatures() {


    loadOneSignature(
        "teacher"
    );


    loadOneSignature(
        "principal"
    );

}


/* =================================================
   تحميل توقيع واحد
================================================= */

function loadOneSignature(type) {


    const storageKey =
        type === "teacher"

        ? "teacherSignature"

        : "principalSignature";


    const imageData =
        localStorage.getItem(
            storageKey
        );


    if (!imageData) {
        return;
    }


    let image;

    let text;


    if (
        type ===
        "teacher"
    ) {

        image =
            document.getElementById(
                "teacherSignature"
            );


        text =
            document.getElementById(
                "teacherSignatureText"
            );

    }

    else {

        image =
            document.getElementById(
                "principalSignature"
            );


        text =
            document.getElementById(
                "principalSignatureText"
            );

    }


    image.src =
        imageData;


    image.style.display =
        "block";


    text.style.display =
        "none";

}


/* =================================================
   المعاينة عند فتح التعديل
================================================= */

function loadPreview(type) {


    const storageKey =
        type === "teacher"

        ? "teacherSignature"

        : "principalSignature";


    const imageData =
        localStorage.getItem(
            storageKey
        );


    if (!imageData) {
        return;
    }


    const preview =
        document.getElementById(

            type === "teacher"

            ? "teacherPreview"

            : "principalPreview"

        );


    if (!preview) {
        return;
    }


    preview.innerHTML = `

        <img
            src="${imageData}"
            alt="معاينة التوقيع">

    `;

}


/* =================================================
   حفظ بيانات التقرير
================================================= */

function saveLocal() {

    localStorage.setItem(

        "initiativeReportData",

        JSON.stringify(data)

    );

}


/* =================================================
   تحميل بيانات التقرير
================================================= */

function loadLocal() {


    const saved =
        localStorage.getItem(
            "initiativeReportData"
        );


    if (!saved) {
        return;
    }


    try {


        const savedData =
            JSON.parse(
                saved
            );


        Object.assign(
            data,
            savedData
        );


        updatePage();


    }

    catch(error) {

        console.log(
            "تعذر تحميل البيانات"
        );

    }

}


/* =================================================
   تحديث الصفحة
================================================= */

function updatePage() {


    document.getElementById(
        "schoolName"
    ).textContent =
        data.school;


    document.getElementById(
        "programName"
    ).textContent =
        data.program;


    document.getElementById(
        "programDate"
    ).textContent =
        data.date;


    document.getElementById(
        "programPeriod"
    ).textContent =
        data.period;


    document.getElementById(
        "targetGroup"
    ).textContent =
        data.target;


    document.getElementById(
        "teacherName"
    ).textContent =
        data.teacher;


    document.getElementById(
        "principalName"
    ).textContent =
        data.principal;

}


/* =================================================
   طباعة التقرير
================================================= */

function printReport() {

    closeEditor();


    setTimeout(
        function() {

            window.print();

        },
        150
    );

}


/* =================================================
   إغلاق النافذة عند الضغط خارجها
================================================= */

document.addEventListener(
    "click",
    function(event) {


        const modal =
            document.getElementById(
                "editorModal"
            );


        if (
            event.target === modal
        ) {

            closeEditor();

        }

    }
);


/* =================================================
   التشغيل
================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {


        loadLocal();


        createQRCode();


        loadSignatures();


    }
);