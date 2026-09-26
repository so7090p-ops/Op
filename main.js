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


    if (
        typeof QRCode ===
        "undefined"
    ) {

        container.innerHTML = `
            <div class="qr-error">
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

    }

    catch(error) {

        console.error(
            "QR Error:",
            error
        );

    }

}


/* =========================================
   رفع التوقيع
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


    /* التأكد من أنها صورة */

    if (
        !file.type.startsWith(
            "image/"
        )
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


                text =
                    document.getElementById(
                        "principalSignatureText"
                    );


                localStorage.setItem(
                    "principalSignature",
                    imageData
                );

            }


            image.src =
                imageData;


            image.style.display =
                "block";


            text.style.display =
                "none";


        };


    reader.readAsDataURL(
        file
    );

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


        const text =
            document.getElementById(
                "teacherSignatureText"
            );


        image.src =
            teacherSignature;


        image.style.display =
            "block";


        text.style.display =
            "none";

    }


    /* توقيع المديرة */

    if (principalSignature) {


        const image =
            document.getElementById(
                "principalSignature"
            );


        const text =
            document.getElementById(
                "principalSignatureText"
            );


        image.src =
            principalSignature;


        image.style.display =
            "block";


        text.style.display =
            "none";

    }

}


/* =========================================
   طباعة التقرير
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