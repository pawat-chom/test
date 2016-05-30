define(function (require) {
  'use strict';

  require('app/common/services/feed');

  describe('feed service', function () {
    var httpBackend, constant,
      feedService;

    beforeEach(function() {
      module('common.services.feed', 'common.services.notifications');

      inject(function ($httpBackend, _FAME_CONSTANTS_, _feedService_) {
        httpBackend = $httpBackend;
        constant = _FAME_CONSTANTS_;

        feedService = _feedService_;
      });
    });

    it('should get a list of players', function () {
      // Arrange
      var feed = 'football.all';
      var param = {page: 1, per_page: 20};
      var returnData = {
        "page": 1, "per_page": 20, "count": 20, "total": 200,
        "items": [
          {
            "attributes": {
              "profile-image": {"value": "lionel-messi-g-p3.jpg"},
              "server-url": {"value": "imgs.footballindex.co.uk"},
              "thumbnail-image": {"value": "lionel-messi-g-t2.jpg"},
              "optimized_image": "lionel-messi-g-t3.jpg"
            },
            "id": "lionel-messi",
            "name": "Lionel Messi",
            "team": "Barcelona",
            "rank": 1,
            "score": "1.583",
            "sectors": {
              "all": {"name": "all", "rank": 1},
              "second": {"name": "Striker", "rank": 1},
              "third": {"name": "all", "rank": 1}
            },
            "type": {"id": "celeb", "name": "Celebrity"},
            "urlname": "lionel-messi",
            "buzznews": {
              "title": "Barcelona’s mighty Lionel Messi ready for encore against Bayern Munich",
              "total": 56
            },
            "history": {
              "20150727": {
                "sectors": {
                  "all": {"name": "all", "rank": 1},
                  "second": {"name": "Striker", "rank": 1},
                  "third": {"name": "all", "rank": 1}
                }, "rank": 1, "trending": 98
              },
              "20150728": {
                "sectors": {
                  "all": {"name": "all", "rank": 1},
                  "second": {"name": "Striker", "rank": 1},
                  "third": {"name": "all", "rank": 1}
                }, "rank": 1, "trending": 48
              }
            },
            "buzzscore": 260,
            "wikiurl": "https://en.wikipedia.org/wiki/Lionel_Messi",
            "optaid": "p19054",
            "optateamid": "t178",
            "optacompid": "23"
          },
          {
            "attributes": {
              "profile-image": {"value": "cristiano-ronaldo-g-p2.jpg"},
              "server-url": {"value": "imgs.footballindex.co.uk"},
              "thumbnail-image": {"value": "cristiano-ronaldo-g-t2.jpg"},
              "optimized_image": "cristiano-ronaldo-g-t3.jpg"
            },
            "id": "cristiano-ronaldo",
            "name": "Cristiano Ronaldo",
            "team": "Real Madrid",
            "rank": 2,
            "score": "1.4670000000000001",
            "sectors": {
              "all": {"name": "all", "rank": 2},
              "second": {"name": "Striker", "rank": 2},
              "third": {"name": "all", "rank": 2}
            },
            "type": {"id": "celeb", "name": "Celebrity"},
            "urlname": "cristiano-ronaldo",
            "buzznews": {
              "title": "Ex-Man Utd star Cristiano Ronaldo ISN'T the best Real Madrid player ever - Jose Santamaria",
              "total": 15
            },
            "history": {
              "20150727": {
                "sectors": {
                  "all": {"name": "all", "rank": 2},
                  "second": {"name": "Striker", "rank": 2},
                  "third": {"name": "all", "rank": 2}
                }, "rank": 2, "trending": 129
              },
              "20150728": {
                "sectors": {
                  "all": {"name": "all", "rank": 2},
                  "second": {"name": "Striker", "rank": 2},
                  "third": {"name": "all", "rank": 2}
                }, "rank": 2, "trending": 112
              }
            },
            "buzzscore": 320,
            "wikiurl": "https://en.wikipedia.org/wiki/Cristiano_Ronaldo",
            "optaid": "p14937",
            "optacompid": "23",
            "optateamid": "t186",
            "optaseason": "2015"
          },
          {
            "attributes": {
              "profile-image": {"value": "philippe-coutinho-g-p1.jpg"},
              "server-url": {"value": "imgs.footballindex.co.uk"},
              "thumbnail-image": {"value": "philippe-coutinho-g-t2.jpg"},
              "optimized_image": "philippe-coutinho-g-t3.jpg"
            },
            "id": "philippe-coutinho",
            "name": "Philippe Coutinho",
            "team": "Liverpool",
            "rank": 3,
            "score": "1.351",
            "sectors": {
              "all": {"name": "all", "rank": 3},
              "second": {"name": "Midfielder", "rank": 1},
              "third": {"name": "all", "rank": 3}
            },
            "type": {"id": "celeb", "name": "Celebrity"},
            "urlname": "philippe-coutinho",
            "buzznews": {
              "title": "Liverpool ace Philippe Coutinho on his new contract, Youtube clips and Terry's PFA vote",
              "total": 8
            },
            "history": {
              "20150727": {
                "sectors": {
                  "all": {"name": "all", "rank": 3},
                  "second": {"name": "Midfielder", "rank": 1},
                  "third": {"name": "all", "rank": 3}
                }, "rank": 3, "trending": 84
              },
              "20150728": {
                "sectors": {
                  "all": {"name": "all", "rank": 3},
                  "second": {"name": "Midfielder", "rank": 1},
                  "third": {"name": "all", "rank": 3}
                }, "rank": 3, "trending": 77
              }
            },
            "buzzscore": 0,
            "wikiurl": "https://en.wikipedia.org/wiki/Philippe_Coutinho",
            "optaid": "p19054",
            "optateamid": "t14",
            "optacompid": "8"
          },
          {
            "attributes": {
              "profile-image": {"value": "neymar-g-p2.jpg"},
              "server-url": {"value": "imgs.footballindex.co.uk"},
              "thumbnail-image": {"value": "neymar-g-t2.jpg"},
              "optimized_image": "neymar-g-t4.jpg"
            },
            "id": "neymar",
            "name": "Neymar",
            "team": "Barcelona",
            "rank": 4,
            "score": "1.3180000000000001",
            "sectors": {
              "all": {"name": "all", "rank": 4},
              "second": {"name": "Striker", "rank": 3},
              "third": {"name": "all", "rank": 4}
            },
            "type": {"id": "celeb", "name": "Celebrity"},
            "urlname": "neymar",
            "buzznews": {"title": "Trial over Neymar case approved", "total": 4},
            "history": {
              "20150727": {
                "sectors": {
                  "all": {"name": "all", "rank": 4},
                  "second": {"name": "Striker", "rank": 3},
                  "third": {"name": "all", "rank": 4}
                }, "rank": 4, "trending": 183
              },
              "20150728": {
                "sectors": {
                  "all": {"name": "all", "rank": 4},
                  "second": {"name": "Striker", "rank": 3},
                  "third": {"name": "all", "rank": 4}
                }, "rank": 4, "trending": 136
              }
            },
            "buzzscore": 80,
            "wikiurl": "https://en.wikipedia.org/wiki/Neymar",
            "optaid": "p61278",
            "optateamid": "t178",
            "optacompid": "23"
          },
          {
            "attributes": {
              "profile-image": {"value": "ramires-g-p1.jpg"},
              "server-url": {"value": "imgs.footballindex.co.uk"},
              "thumbnail-image": {"value": "ramires-g-t2.jpg"},
              "optimized_image": "ramires-g-t3.jpg"
            },
            "id": "ramires",
            "name": "Ramires",
            "team": "Chelsea",
            "rank": 20,
            "score": "1.165",
            "sectors": {
              "all": {"name": "all", "rank": 13},
              "second": {"name": "Midfielder", "rank": 4},
              "third": {"name": "all", "rank": 13}
            },
            "type": {"id": "celeb", "name": "Celebrity"},
            "urlname": "ramires",
            "buzznews": {
              "title": "TEAM NEWS UPDATE: Cuadrado starts for Chelsea after Ramires injured in warm up",
              "total": -18
            },
            "history": {
              "20150727": {
                "sectors": {
                  "all": {"name": "all", "rank": 14},
                  "second": {"name": "Midfielder", "rank": 4},
                  "third": {"name": "all", "rank": 14}
                }, "rank": 14, "trending": 182
              },
              "20150728": {
                "sectors": {
                  "all": {"name": "all", "rank": 13},
                  "second": {"name": "Midfielder", "rank": 4},
                  "third": {"name": "all", "rank": 13}
                }, "rank": 13, "trending": 75
              }
            },
            "buzzscore": 0,
            "wikiurl": "https://en.wikipedia.org/wiki/Ramires",
            "optaid": "p53392",
            "optateamid": "t8",
            "optacompid": "8"
          }]
      };
      var url = constant.API_URL + '/football.all/?page=1&per_page=20';
      httpBackend.expectGET(url).respond(returnData);

      // Act
      var result;
      feedService.feed(feed, param).then(function (res) {
        result = res.data;
      });
      httpBackend.flush();

      // Assert
      expect(result).to.deep.equal(returnData);
    });

    it('prices() should return data from API call', function() {
      // Arrange
      var names = ['name1', 'name2'], returnObject = 'data';
      httpBackend.expectPOST(constant.API_URL + '/prices').respond(returnObject);

      // Act
      var result;
      feedService.prices(names).then(function(response) {
        result = response.data;
      });
      httpBackend.flush();

      // Assert
      expect(result).to.equal(returnObject);
    });

    it('test() should return data from API call', function() {
      // Arrange
      var feedId = 'id', params = { param: 'param' }, returnObject = 'data';
      httpBackend.expectGET(constant.API_URL + '/data/?param=' + params.param).respond(returnObject);

      // Act
      var result;
      feedService.test(feedId, params).then(function(response) {
        result = response.data;
      });
      httpBackend.flush();

      // Assert
      expect(result).to.equal(returnObject);
    })
  });
});
