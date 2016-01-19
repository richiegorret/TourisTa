var tour = ons.bootstrap( "tourista" , [ "onsen" , "ngCordova" ] );

tour
	.factory( "Host" , [
		function factory ( ) {
			var host = "http://192.168.1.33/TourisTa-1.3/index.php/api";

			this.get = function getHost ( path ) {
				return host + "/" + path;
			};

			return this;
		}
	] )

	.directive( "uiTemplate" , [ 
		function directive ( ) {
			return {
				"restrict": "A",
				"scope": true,
				"templateUrl": function onLoadTemplate ( element , attributeSet ) {
					return attributeSet.uiTemplate;
				}
			}
		}
	] )

	.directive( "login" , [
		"$http",
		"$cordovaOauth",
		"Host",
		function directive ( $http , $cordovaOauth , Host ) {
			return {
				"restrict": "A",
				"scope": true,
				"link": function onLink ( scope , element , attributeSet ) {
					scope.user = { };

					scope.userLogin = function userLogin ( ) {						
						$http.post( Host.get("login") , scope.user )
						.then( function ( response ) {
							console.log( response );
							if ( response.data.logged_in ) {
								scope.navig.pushPage( "home.html" );							
							} else {
								scope.user = { };
							}
						} );
					};

					scope.googleLogin = function googleLogin ( ) {
						$cordovaOauth.google( "1057767960507-k53j6ajvbd4cafq7tbn9f0l7ck56d5dh.apps.googleusercontent.com" , 
							["https://www.googleapis.com/auth/plus.me" , "https://www.googleapis.com/auth/userinfo.email"] )
						.then( function ( result ) {
							console.log( result );
						} );
					};
				}
			}
		}
	] )

	.directive( "fetchData" , [
		"$http",
		"Host",
		function directive ( $http , Host ) {
			return {
				"restrict": "A",
				"scope": true,
				"link": function onLink ( scope , element , attributeSet ) {
					scope.packages = [];

					$http.get( Host.get( "fetch_packages" ) )
					.then( function ( response ) {
						console.log( response );
						scope.packages = response.data;
					} );
				}
			}
		}
	] );