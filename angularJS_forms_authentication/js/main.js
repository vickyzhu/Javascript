/**
 * Created by vickyzhu on 2016/6/28.
 */
angular.module('myApp',[])
    .controller('signUpCtrl',function($scope){
        var oSucTips = document.getElementsByClassName('alert-success')[0],
            oErrTips = document.getElementsByClassName('alert-danger')[0];

        $scope.userdata = {}
        $scope.submitForm = function(){
            if($scope.signUpForm.$valid){
                oErrTips.setAttribute('hidden','hidden');
                oSucTips.removeAttribute('hidden');
            }else{
                oSucTips.setAttribute('hidden','hidden');
                oErrTips.removeAttribute('hidden');
            }
        }
    })
    .directive('compare',function(){
        //自定义指令compare，用于比较密码跟确认密码的值
        var o = {};
        o.scope = {
            orgVal : '=compare'
        };
        //A:attribute ,E:element
        o.strict = "AE";
        o.require = 'ngModel';
        o.link = function(sco,ele,attrs,ngModelController){
            //给$validators添加compare指令
            ngModelController.$validators.compare = function(modelVal){
                //modelVal 为确认密码的值
                return modelVal == sco.orgVal;
            }
            sco.$watch('orgVal',function(){
                //监听orgVal，若有改动则进行比较
                ngModelController.$validate();
            });
        }
        return o;
    })