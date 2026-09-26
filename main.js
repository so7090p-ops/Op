/* =========================================
   رابط الشواهد
========================================= */

const evidenceURL =
    "https://drive.google.com/drive/folders/1gY-KnfhZqUZYd5Pa3u6XrXuoFRspwVXl";


/* =========================================
   إنشاء QR
========================================= */

function createQRCode() {

    const container =
        document.getElementById("qrcode");


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (typeof QRCode === "undefined") {

        container.innerHTML = `
            <div style="
                font-size:7px;
                color:#777;
                text-align:center;
            ">
                جاري تحميل الرمز...
            </div>
        `;

        setTimeout(
            createQRCode,
            1000
        );

        return;
    }


    try {

        new QRCode(
            container,
            {
                text: evidenceURL,

                width: 68,

                height: 68,

                correctLevel:
                    QRCode.CorrectLevel.H
            }
        );

    } catch (error) {

        console.error(
            "خطأ في إنشاء QR:",
            error
        );

    }
}


/* =========================================
   رفع صورة التوقيع
========================================= */

function uploadSignature(
    type,
    input
) {

    if (
        !input ||
        !input.files ||
        !input.files[0]
    ) {

        return;
    }


    const file =
        input.files[0];


    if (
        !file.type.startsWith("image/")
    ) {

        alert(
            "فضلاً اختاري صورة للتوقيع."
        );

        return;
    }


    const reader =
        new FileReader();


    reader.onload =
        function(event) {

            const imageData =
                event.target.result;


            let image;


            if (type === "teacher") {

                image =
                    document.getElementById(
                        "teacherSignature"
                    );


                localStorage.setItem(
                    "teacherSignature",
                    imageData
                );

            }

            else {

                image =
                    document.getElementById(
                        "principalSignature"
                    );


                localStorage.setItem(
                    "principalSignature",
                    imageData
                );

            }


            /* إظهار الصورة */

            image.src =
                imageData;


            image.style.display =
                "inline-block";

            /*
             * مهم:
             * لا نخفي كلمة "التوقيع".
             * ستبقى ظاهرة بجانب الصورة.
             */

        };


    reader.readAsDataURL(file);

}


/* =========================================
   تحميل التوقيعات المحفوظة
========================================= */

function loadSignatures() {


    const teacherSignature =
        localStorage.getItem(
            "teacherSignature"
        );


    const principalSignature =
        localStorage.getItem(
            "principalSignature"
        );


    /* توقيع المعلمة */

    if (teacherSignature) {

        const image =
            document.getElementById(
                "teacherSignature"
            );


        image.src =
            teacherSignature;


        image.style.display =
            "inline-block";

    }


    /* توقيع المديرة */

    if (principalSignature) {

        const image =
            document.getElementById(
                "principalSignature"
            );


        image.src =
            principalSignature;


        image.style.display =
            "inline-block";

    }

}


/* =========================================
   الطباعة
========================================= */

function printReport() {

    window.print();

}


/* =========================================
   تشغيل الصفحة
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        createQRCode();

        loadSignatures();

    }
);