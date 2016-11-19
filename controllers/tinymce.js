mainApp.controller('TinyMceController', function($scope, $rootScope) {
    $scope.tinymceModel = '';

    $scope.getContent = function() {
        console.log('Editor content:', $scope.tinymceModel);
    };

    $scope.setContent = function() {
        $scope.tinymceModel = 'Time: ' + (new Date());
    };

    $scope.tinymceOptions = {
        theme : "modern",
        content_css: "/Audrey&Lewo/admin/assets/css/tiny.css",
        autoresize_min_height: 100,
        plugins: 'link textcolor image table contextmenu code autoresize',
        toolbar: 'bold italic underline forecolor backcolor | alignleft aligncenter alignright alignjustify' +
        ' | outdent indent | link image code | fontselect | fontsizeselect | styleselect | removeformat',
        tools: "inserttable",
        font_formats: "Georgia=georgia,palatino;" + "Arial=arial,helvetica,sans-serif;" +
            "Arial Black=arial black,avant garde;" + "Courier=courier new,courier;" +
            "Times New R=times new roman,times;",
        init_instance_callback : function() {
            $rootScope.$broadcast('tinymceOnLoad');
        },
        fontsize_formats: '8pt 10pt 12pt 14pt 18pt 24pt 36pt 60pt',
        style_formats: [
            { title: 'Quote', block: 'blockquote' }
        ],
        menubar: false,
        statusbar : false,
        resize: false
    };
});