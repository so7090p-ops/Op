/* ================================
   بيانات التقرير
================================ */

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


/* ================================
   فتح نافذة التعديل
================================ */

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
        document.getElementById(
            "ideaContent"
        ).innerText.trim();


    document.getElementById(
        "editImportance"
    ).value =
        document.getElementById(
            "importanceContent"
        ).innerText.trim();


    document.getElementById(
        "editTeacher"
    ).value =
        data.teacher;


    document.getElementById(
        "editPrincipal"
    ).value =
        data.principal;


    document.getElementById(
        "editorModal"
    ).classList.add("show");

}


/* ================================
   إغلاق النافذة
================================ */

function closeEditor() {

    document.getElementById(
        "editorModal"
    ).classList.remove("show");

}


/* ================================
   حفظ التعديلات
================================ */

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


    document.getElementById(
        "ideaContent"
    ).innerHTML =
        formatText(
            document.getElementById(
                "editIdea"
            ).value
        );


    document.getElementById(
        "importanceContent"
    ).innerHTML =
        formatText(
            document.getElementById(
                "editImportance"
            ).value
        );


    closeEditor();


    saveLocal();

}


/* ================================
   تحويل النص مع الأسطر
================================ */

function formatText(text) {

    return escapeHtml(text)
        .replace(/\n/g, "<br>");

}


/* ================================
   حماية النص
================================ */

function escapeHtml(text) {

    return String(text || "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* ================================
   حفظ في المتصفح
================================ */

function saveLocal() {

    localStorage.setItem(
        "initiativeReportData",
        JSON.stringify(data)
    );

}


/* ================================
   تحميل البيانات
================================ */

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
            JSON.parse(saved);


        Object.assign(
            data,
            savedData
        );


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

    catch(error) {

        console.log(
            "تعذر تحميل البيانات"
        );

    }

}


/* ================================
   تشغيل
================================ */

loadLocal();