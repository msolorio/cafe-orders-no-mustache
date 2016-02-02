$(function() {

    var $currentOrders = $('.current-orders');
    var $name = $('#name');
    var $item = $('#item');

    var $errorName = $('#add-order-error-name');
    var $errorItem = $('#add-order-error-item');

    //ON PAGE LOAD GET ALL OLD ORDERS
    //GET REQUEST
    $.ajax({
        type: 'GET',
        url: 'http://rest.learncode.academy/api/msolorio1/orders',
        success: function(oldOrders) {
            $.each(oldOrders, function(i, oldOrder) {
                $currentOrders.append(
                    '<li class="current-order-single">Name: ' +
                    oldOrder.name +
                    ', ' +
                    oldOrder.item +
                    '<span class="cross" data-id="' +
                    oldOrder.id +
                    '">&#735;</span>' +
                    '</li>'
                );
            });
        },
        error: function() {
            alert('error loading orders');
        }
    });

    //ADDING A NEW ORDER
    $('#add-order').on('click', function() {
        var order = {
            name: $name.val(),
            item: $item.val()
        };

        //validate entry
        $errorName.html('');
        $errorItem.html('');

        var addOrder = true;
        if (order.name === '') {
            addOrder = false;
            $errorName.html('please supply a name');
        }
        if (order.item === '') {
            addOrder = false;
            $errorItem.html('please supply an item');
        }

        if (addOrder) {

            //POST REQUEST
            $.ajax({
                type: 'POST',
                url: 'http://rest.learncode.academy/api/msolorio1/orders',
                data: order,
                success: function(newOrder) {
                    $currentOrders.append(
                        '<li class="current-order-single">Name: ' +
                        newOrder.name +
                        ', ' +
                        newOrder.item +
                        '<span class="cross" data-id="' +
                        newOrder.id +
                        '">&#735;</span>' +
                        '</li>'
                    );
                },
                error: function() {
                    alert('error saving new order');
                }
            });

            $('.add-order-input').val('');

        }

    });

    //DELETE ORDER
    //DELETE REQUEST
    $currentOrders.delegate('.cross', 'click', function() {

        var $li = $(this).closest('li');

        $.ajax({
            type: 'DELETE',
            url: 'http://rest.learncode.academy/api/msolorio1/orders/' + $(this).attr('data-id'),
            success: function() {
                $li.fadeOut(100, function() {
                    $(this).remove();
                });
            }
        });
    });

});
