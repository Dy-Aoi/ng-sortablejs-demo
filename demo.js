angular.module('demoApp', ['ng-sortable'])
    .controller('demoCtrl', ['$scope', function ($scope) {
        $scope.sortList = [3,5,7,9,11,13,14]
        $scope.all  = [
            {id: 1, name: '哈哈1', checked: false},
            {id: 2, name: '哈哈2', checked: false},
            {id: 3, name: '哈哈3', checked: true},
            {id: 4, name: '哈哈4', checked: false},
            {id: 5, name: '哈哈5', checked: true},
            {id: 6, name: '哈哈6', checked: false},
            {id: 7, name: '哈哈7', checked: true},
            {id: 8, name: '哈哈8', checked: false},
            {id: 9, name: '哈哈9', checked: true},
            {id: 10, name: '哈哈10', checked: false},
            {id: 11, name: '哈哈11', checked: true},
            {id: 12, name: '哈哈12', checked: false},
            {id: 13, name: '哈哈13', checked: true},
            {id: 14, name: '哈哈14', checked: true}
        ]
        $scope.checkedList = [];
        $scope.uncheckedList = [];
        $scope.all.map(function(i) {
            if(i.checked === true) {
                $scope.checkedList.push(i);
            } else {
                $scope.uncheckedList.push(i);
            }
        })
        
        $scope.barConfig = {
			group: 'demo',
            animation: 150,
            filter: '.removeItem',
            onFilter: function (/**Event*/evt) {
                let itemEl = evt.item;  // HTMLElement receiving the `mousedown|tapstart` event.
                //去掉排序
                $scope.sortList = $scope.sortList.filter(function(s) {
                    return JSON.parse(itemEl.dataset.item).id !== s;
                })
                
                itemEl.parentNode.removeChild(itemEl);
                $scope.checkedList.map(function(i){
                    if(itemEl.firstElementChild.textContent === i.name) $scope.uncheckedList.push(i);
                })
                $scope.checkedList = $scope.checkedList.filter(function(i){
                    return itemEl.firstElementChild.textContent !== i.name;
                })

                //插入排序字段
                let allList = [$scope.checkedList, $scope.uncheckedList];
                allList.map(function(l){
                    l.map(function(u) {
                        let sort = "";
                        $scope.sortList.map(function(s){
                            if(sort === ""){
                                sort = s.toString();
                            }else{
                                sort = sort + "#" + s;
                            }
                        })

                        u.sort = sort + "#";
                    })
                })

                $scope.$apply();
                
            },
            onSort: function (evt){
                $scope.sortList.splice(evt.oldIndex,1);
                $scope.sortList.splice(evt.newIndex, 0, evt.model.id); 
                $scope.checkedList = evt.models;
                getSortList();
                $scope.$apply();
            }
            
        };
        
        $scope.addToList = function(item) {
            $scope.sortList.push(item.id);
            $scope.checkedList.push(item);
            getSortList();

            //从下面删除
            $scope.uncheckedList = $scope.uncheckedList.filter(function(i){
                return i.id !== item.id;
            })
            
        }

        function getSortList() {
            let newList = [];
            //加入上面
            $scope.sortList.map(function(s){
                $scope.checkedList.map(function(c) {
                    if(c.id === s) newList.push(c);
                })
            })
            $scope.checkedList = newList;
        }

    }])