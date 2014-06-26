(function ($) {

    var shareUrl = '';
    var thisShareInfo = {
      'nameId' : {
        'name' : '',
        'ambid' : ''
      },
      'url' : ''
    };

    var queryString = function (url, params) {
        var paramsString = '';
        for ( i in params ) {
            if ( !paramsString.length ) {
                paramsString += url + '?' + i + '=' + params[i];
            } else {
                paramsString += '&' + i + '=' + params[i];
            }
        }

        return paramsString;
    };

    $('.pickers div').click(function (event) {
      var that = $(this);

      if ( that.attr('data-name') ) {
        thisShareInfo.nameId.name = that.attr('data-name');
        thisShareInfo.nameId.ambid = that.attr('data-ambid');
      } else {
        thisShareInfo.url = that.attr('data-url');
      }

      that.siblings().removeClass('active');
      that.addClass('active');

      if ( thisShareInfo.url && thisShareInfo.nameId.name ) {
        shareUrl = queryString(thisShareInfo.url, thisShareInfo.nameId);
        document.getElementById('new-button').innerHTML = '';
        twttr.widgets.createShareButton(
          shareUrl + '&src=twttr',
          document.getElementById('new-button'),
          function (el) {
          },
          {
            count: 'none',
            text: 'This is just a test of t Rextole'
          }
        );
      }


    });

    $('#sendEmail').click(function () {
        var from = $('#yourEmail').val();
        var to = $('#friendEmail').val();
        var subject = "tRextole test email";
        var content = $('#emailText').val();
        var link = shareUrl + '&src=email';
        var giantDisgustingString = '<html>' +
                                    '<head>' +
                                      '<title>Simple email</title>' +
                                    '</head>' +
                                    '<body>' +
                                      '<p>' + escape(content) + '</p>' +
                                      escape(link) +
                                    '</body>' +
                                    '</html>';
        if ($('.pickers .active').length !== 2) {
            alert('Please pick a site and a person to share as.');
            return false;
        } else if (!(from) || !(to) || !(content)) {
            alert('Please fill out all the fields.');
            return false;
        }
        var data = "from=" + from + "&to=" + to + "&subject=" + subject + "&content=" + giantDisgustingString;
        $.ajax({
            type: "POST",
            url: "php/email.php",
            data: data,
            success: function () {
            }
        });
    });

    $('#tRexNav input').change(function () {
        var that = $(this);
        var thisShare = $('.' + that.attr('id'));
        var shares = $('.share');
        if ($('.pickers .active').length !== 2 && that.attr('id') !== 'email') {
            alert('Please pick a site and a person to share as.');
            //This is a really stupid bootstrap javascript override that needs to be replaced.
            //Sadly, it works for now
            setTimeout(function() {
                $('#tRexNav label').removeClass('active');
                $($('#tRexNav label')[0]).addClass('active');
            }, 50);
            return false;
        }
        shares.hide();
        thisShare.show();
    });

    $('#fbShare').click(function () {
        var publish = {
          method: 'feed',
          name: 'Share',
          caption: 'Testing new share feature',
          message: 'This is your message',
          description: (
              'This is just a test of ' +
              't Rextole'
          ),
          link: shareUrl + '&src=fb',
          picture: 'http://beardbro.com/images/iin.png',
        };
        FB.ui(publish);
    });

    twttr.ready(function () {
        twttr.widgets.load();
    });


}(jQuery));
