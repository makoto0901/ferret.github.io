(function() {
  $(function(){
    var likecnt = 0;
    var totalcnt = 0;
    function updateCount() {

    }

    function addMesseageContent(input, messeageid) {
      $('#contents').append(`
        <div class="messeage-content">
          <div class="message-area">${input}</div>
          <input type="button" class="message-edit" value="edit">
          <input type="button" class="message-delete" value="delete">
          <input type="button" class="message-like" value="like">
          <div messeage-id="${messeageid}" class="${messeageid} mark-like"></div>
        </div>
      `);
    }

    $('#footer-button').click(function(e) {
      let input = $('#footer-text').val();
      if (! $('#footer-text').hasClass('edit-mode')) {
        if (input) {
          addMesseageContent(input, likecnt);
          updateCount();
        }
        $('#footer-text').val('');
      } else {
        $('#footer-text').val($(this).parent().find('.message-area')[0].textContent);
      }
      e.preventDefault();
    });

    $(document).on("click", ".message-edit", function () {
      $('#footer-text').val($(this).parent().find('.message-area')[0].textContent);
      $('#footer-text').addClass('edit-mode');
      $('#footer-text').focus();
    });

    $(document).on("click", ".message-delete", function (e) {
      let res = confirm('削除しますがよろしいでしょうか?');
      if (res) {
        $(this).parent().remove();
      }
    });

    $(document).on("click", "#message-like", function () {
      $('.mark-like').removeClass().addClass("mark-dont-like");
    });

  })
})();


