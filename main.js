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


    /*
     * إذا لم يتم اختيار صورة
     */

    if (
        !input ||
        !input.files ||
        !input.files[0]
    ) {

        return;

    }


    const file =
        input.files[0];


    /*
     * التأكد من أن الملف صورة
     */

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


            /*
             * توقيع المعلمة
             */

            if (
                type === "teacher"
            ) {

                image =
                    document.getElementById(
                        "teacherSignature"
                    );

            }


            /*
             * توقيع المديرة
             */

            else {

                image =
                    document.getElementById(
                        "principalSignature"
                    );

            }


            /*
             * عرض الصورة
             */

            image.src =
                imageData;


            image.style.display =
                "inline-block";


            /*
             * مهم جدًا:
             *
             * لا يوجد localStorage
             *
             * لذلك الصورة لا تحفظ
             * بعد إغلاق الصفحة.
             *
             * عند فتح الرابط من جديد
             * يبدأ بدون توقيع.
             */

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


        /*
         * إنشاء QR
         */

        createQRCode();


        /*
         * لا يوجد تحميل للتوقيعات.
         *
         * كل فتح جديد يبدأ
         * بدون أي توقيع.
         */


    }
);