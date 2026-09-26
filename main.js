/* =========================================
   رابط مجلد الشواهد
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


    /*
     * إذا لم تحمل مكتبة QR بعد،
     * نحاول مرة أخرى بعد ثانية.
     */

    if (
        typeof QRCode === "undefined"
    ) {

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

                text:
                    evidenceURL,

                width:
                    68,

                height:
                    68,

                correctLevel:
                    QRCode.CorrectLevel.H

            }

        );

    }

    catch (error) {

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


    /* لا توجد صورة */

    if (
        !input ||
        !input.files ||
        !input.files[0]
    ) {

        return;

    }


    const file =
        input.files[0];


    /* التأكد من أن الملف صورة */

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

            let cameraButton;



            /* =================================
               توقيع المعلمة
            ================================= */

            if (
                type === "teacher"
            ) {

                image =
                    document.getElementById(
                        "teacherSignature"
                    );

                cameraButton =
                    document.getElementById(
                        "teacherCamera"
                    );

            }



            /* =================================
               توقيع المديرة
            ================================= */

            else {

                image =
                    document.getElementById(
                        "principalSignature"
                    );

                cameraButton =
                    document.getElementById(
                        "principalCamera"
                    );

            }



            /* =================================
               عرض صورة التوقيع
            ================================= */

            image.src =
                imageData;

            image.style.display =
                "inline-block";



            /* =================================
               إخفاء الكاميرا فوراً
            ================================= */

            if (cameraButton) {

                cameraButton.style.display =
                    "none";

                cameraButton.style.visibility =
                    "hidden";

            }


        };


    reader.readAsDataURL(
        file
    );

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


        /* إنشاء QR */

        createQRCode();


        /*
         * لا يوجد localStorage
         *
         * لذلك التوقيعات لا تُحفظ
         * عند إعادة فتح الرابط.
         */

    }
);