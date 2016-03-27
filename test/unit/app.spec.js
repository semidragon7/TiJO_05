describe('app', function () {
    'use strict';

    var app = window.app;

    describe('generateMessage', function ()
    {
        //console.log(app.generateMessage("Michal"));
        it("should return 2 and false parametr Michal it is test ", function () {
            expect(app.generateMessage("Michal")).toEqual({vowel: 2, palindrome: false});
        });
        it("should return false and vowel", function () {
            expect(app.generateMessage("atak")).toEqual({vowel: 2, palindrome: false});
            //console.log(app.generateMessage("alatakamasobiekota"));
            expect(app.generateMessage("alatakamasobiekota")).toEqual({vowel: 10, palindrome: false});
        });
        it("should return true for elemtns ala , zaraz, olo", function () {

            expect(app.generateMessage("ala")).toEqual({vowel: 2, palindrome: true})
            expect(app.generateMessage("olo")).toEqual({vowel: 2, palindrome: true})
            expect(app.generateMessage("zarazzaraz")).toEqual({vowel: 4, palindrome: true})
        });
        it("should return error message when args is not string", function () {
           expect(function () {
               app.generateMessage('')

           }).toThrowError('Empty string!')
        });
        it("should return error message when arg is null", function () {
            expect(function () {
                app.generateMessage()

            }).toThrowError("Null")
        })
    });

    describe('isPalindrome', function () {

        describe('toHaveBeenCalled', function () {
            beforeAll(function () {
                spyOn(app, 'isPalindrome');
                app.isPalindrome('zaraz');
            });
            it('should actual calls isPalindrome function for arg args zaraz', function () {
                //spy appointed
                expect(app.isPalindrome).toHaveBeenCalled();
                expect(app.isPalindrome).toHaveBeenCalledWith('zaraz');

            });
        });

        describe('and.callThrough', function ()
        {
            beforeAll(function () {
                //spy appointed and all chain
                spyOn(app,'isPalindrome').and.callThrough();
                app.isPalindrome('ata');
                app.generateMessage('ola')
            });
            it('should call isPalindrome vowelCount function and when  generateMessage is call', function () {
                expect(app.isPalindrome).toHaveBeenCalled();
                expect(app.isPalindrome).toHaveBeenCalledWith('ata');
                expect(app.isPalindrome).toHaveBeenCalledWith('ola');
            });
        });

        describe('and.returnValue', function ()
        {
            var args;
            beforeAll(function () {
                spyOn(app,'isPalindrome').and.returnValue(false);
            });
            it('Should call generateMessage and isPalidrom should return value {3,false}', function () {
                //console.log(app.generateMessage('atal'));
                args = app.generateMessage("atalllllak");
                expect(args).toEqual({vowel: 3, palindrome: false});

            });
            it('should call isPalindrom and should return true', function () {
                args = app.isPalindrome('ola');
                expect(args).toEqual(false)

            })
        });
        describe('and.callFake', function ()
        {
            beforeAll(function () {
                spyOn(app,'isPalindrome').and.callFake(function () {
                    return "It is Fake"
                });
            });
           it('should call isPalindrom and will throw value callFake when will be false or true function ', function () {
                expect(app.isPalindrome('ssadgasfasf')).toEqual('It is Fake')
           })
            it('should call isPalindrom and generateMessage called and return false -- It is fake also value', function () {
               console.log(app.generateMessage('ala'))
                expect(app.generateMessage('asdasddd')).toEqual({vowel: 2, palindrome: 'It is Fake'});
            })
        });
        //zwraca liczbę razy szpieg został nazwany
        describe('calls.count()', function ()
        {
            var variable;
            beforeAll(function () {
                spyOn(app,'generateMessage').and.callThrough();
                spyOn(app,'isPalindrome').and.callThrough();
            });
            it('should call generateMessage function', function () {
                variable = app.generateMessage('olo');
                variable = app.generateMessage('asdas');
                expect(app.generateMessage.calls.count()).toBe(2)
            });
            it('should notice isPalindrome is second function when first is  generateMessage called', function () {
                variable = app.isPalindrome('oootakasobie');
                expect(app.isPalindrome.calls.count()).toBe(3);
            })
        });
    });

    describe('vowelCount', function () {

        describe('toHaveBeenCalled', function () {
            beforeAll(function () {
                spyOn(app,'vowelCount');
                app.vowelCount('aaa2s');
            })
            it('should call vowelCoun', function () {
                expect(app.vowelCount).toHaveBeenCalled();
                expect(app.vowelCount).toHaveBeenCalledWith('aaa2s')
            })
        });

        describe('and.callThrough', function () {
            beforeAll(function () {
                spyOn(app,'vowelCount').and.callThrough();
                app.generateMessage('ola');
            })
            it('should call vowelCount function when generateMessage is call', function () {
                expect(app.vowelCount).toHaveBeenCalled();
                expect(app.vowelCount).toHaveBeenCalledWith('ola');

            })
        });

        describe('and.returnValue', function () {
            beforeAll(function () {
                spyOn(app,'vowelCount').and.returnValue(3)
            });
            it('should call vowelCount and return 3', function () {
              expect(app.vowelCount('aaa')).toEqual(3);
            })
            it('should call vawelCound function and generateMessage is call', function () {
                expect(app.generateMessage('aaa')).toEqual({vowel: 3, palindrome: true});
            })
        });

        describe('and.callFake', function () {
            beforeAll(function () {
                spyOn(app,'vowelCount').and.callFake(function () {
                    return 10;
                });
            });
            it('should return vowelCount functions with result 10', function () {
               expect(app.vowelCount('asd')).toEqual(10);
                expect(app.vowelCount('sadasd')).toEqual(10);
            });
            it('should call vowelCount functions and in the time call generateMessage result vowel 10 palindrom true', function () {
                expect(app.generateMessage('ala')).toEqual({vowel: 10, palindrome: true})
            })
        });

        describe('calls.count()', function () {
            var variable1;
            beforeAll(function () {
                spyOn(app,'vowelCount').and.callThrough();
                spyOn(app,'generateMessage').and.callThrough();
            });
            it('should call vowelCount functions', function () {
                expect(app.vowelCount.calls.count()).toBe(0)
                variable1 = app.vowelCount('ala');
                expect(app.vowelCount('olga')).toBe(2);
            });
            it('should notice that vowelCount functions called with second functions generateMessage called ', function () {
                variable1 = app.generateMessage('michal');
                expect(app.vowelCount.calls.count()).toEqual(3)
                expect(app.generateMessage.calls.count()).toBe(1)
            })
        });
    });
});

