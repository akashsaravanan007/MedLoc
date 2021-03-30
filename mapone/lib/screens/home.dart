import 'package:flutter/material.dart';
// import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:mapone/partials/style.dart';
import 'package:mapone/screens/mapScreen.dart';
// import 'package:location_permissions/location_permissions.dart';
// import 'package:geolocator/geolocator.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key key}) : super(key: key);


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "MEDLOC",
          style: titleStyle,
        ),
        centerTitle: true,
        backgroundColor: Color(0xFF30475e),
      ),
      body: Stack(
        children: <Widget>[
          GoogleMapScreen(),
          Positioned(
              right: 10,
              top: 10,
              child: FloatingActionButton(
                onPressed: () async {
                // await Geolocator.getCurrentPosition().then((value) => {
                //       print( value.toString())
                //     });
              },
                child: Icon(Icons.search),
                backgroundColor: Color(0xFFf05454),
              )
              )
        ],
      ),
    );
  }
}


