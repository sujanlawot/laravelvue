(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Signature.vue?vue&type=script&lang=js&":
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib??ref--4-0!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Signature.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "./node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var canvas = null;
var ctx = null;

function timedDetect() {
  if (wgssSignatureSDK.running) {
    document.getElementById("statusText").innerHTML = "Signature SDK Service detected";
  } else {
    document.getElementById("statusText").innerHTML = "Signature SDK Service not detected";
  }
}

var timeout = setTimeout(timedDetect, 1500);

function onDetectRunning() {
  document.getElementById("statusText").innerHTML = "Signature SDK Service detected";
  clearTimeout(timeout);
} // pass the starting service port  number as configured in the registry


var wgssSignatureSDK = new WacomGSS_SignatureSDK(onDetectRunning, 8000);

function restartSession(onRestartSession) {
  document.getElementById("statusText").innerHTML += "<br>Restarting the session";
  wgssSignatureSDK = new WacomGSS_SignatureSDK(onRestartSession, 8000);
}

function wizPin() {
  var wizCtl;
  var sigCtl;
  var pad;
  var inputObj;

  function onDisplay(wizCtlV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Display";
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Display error";
    }
  }

  function onAddInputEcho(wizCtlV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl AddInputEcho";
      wizCtlV.Display(onDisplay);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl AddInputEcho error";
    }
  }

  function onPutFont2(wizCtlV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl PutFont2";
      this.pad.x.Set("center"); // Now set up the y axis position depending on which model pad it is

      if (this.pad.Width == 396 && this.pad.Height == 100) {
        // This is an STU 300
        this.pad.y.Set(y = this.pad.Height / 2);
      } else if (this.pad.Width == 320 && this.pad.Height == 200) {
        // This is a 430
        this.pad.y.Set(y = this.pad.Height / 2);
      } else {
        this.pad.y.Set(y = this.pad.yText + 4 * this.pad.yLSText);
      }

      var vIE = new wgssSignatureSDK.Variant();
      var option = new wgssSignatureSDK.Variant();
      option.Set(8);
      wizCtlV.AddObject(wgssSignatureSDK.ObjectType.ObjectInputEcho, "", this.pad.x, this.pad.y, vIE, option, onAddInputEcho);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl PutFont2 error";
    }
  }

  function onAddInputObj(wizCtlV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl AddInputObj"; // Now set up the pin size depending on which model pad it is

      if (this.pad.Width == 396 && this.pad.Height == 100) {
        // This is an STU 300
        this.pad.PinSize = 10;
      } else if (this.pad.Width == 320 && this.pad.Height == 200) {
        // This is a 430
        this.pad.PinSize = 12;
      } // Otherwise stick to default of 20


      var font = new wgssSignatureSDK.Font(this.pad.Font, this.pad.PinSize);
      var varFont = new wgssSignatureSDK.Variant();
      varFont.Set(font);
      wizCtlV.PutFont(varFont, onPutFont2);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl AddInputObj error";
    }
  }

  function onPutMaxLengthInputObj(inputObjV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>InputObj PutMaxLength";
      this.pad.x.Set(0);
      this.pad.y.Set(0);
      var vIO = new wgssSignatureSDK.Variant();
      vIO.type = wgssSignatureSDK.VariantType.VARIANT_INPUTOBJ;
      vIO.handle = inputObjV.handle;
      var option = new wgssSignatureSDK.Variant();
      this.wizCtl.AddObject(wgssSignatureSDK.ObjectType.ObjectInput, "Input", this.pad.x, this.pad.y, vIO, option, onAddInputObj);
    } else {
      document.getElementById("statusText").innerHTML += "<br>InputObj PutMaxLength error";
    }
  }

  function onPutMinLengthInputObj(inputObjV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>InputObj PutMinLength";
      inputObjV.PutMaxLength(4, onPutMaxLengthInputObj);
    } else {
      document.getElementById("statusText").innerHTML += "<br>InputObj PutMinLength error";
    }
  }

  function onGetPropertyInputObj(inputObjV, property, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>InputObj GetProperty";
      inputObjV.PutMinLength(1, onPutMinLengthInputObj);
    } else {
      document.getElementById("statusText").innerHTML += "<br>InputObj GetProperty error";
    }
  }

  function onClearInputObj(inputObjV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>InputObj Clear";
      inputObjV.GetProperty("Component_FileVersion", onGetPropertyInputObj);
    } else {
      document.getElementById("statusText").innerHTML += "<br>InputObj Clear error";
    }
  }

  function onConstructorInputObj(inputObjV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>InputObj Constructor";
      inputObjV.Clear(onClearInputObj);
    } else {
      document.getElementById("statusText").innerHTML += "<br>InputObj Constructor error";
    }
  }

  function onAddObjectOne(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>Add One Prompt";
      this.inputObj = new wgssSignatureSDK.InputObj(onConstructorInputObj);
    } else {
      document.getElementById("statusText").innerHTML += "<br>Add One failed";
    }
  }

  function onAddObjectText(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>Add Text Prompt"; // The STU 500 values will work OK with the 520 and 530, but not the 300 and 430

      if (this.pad.Width == 396 && this.pad.Height == 100) {
        // This is an STU 300
        this.pad.x.num = this.pad.Width / 6;
        this.pad.y.num = this.pad.Height / 2;
      } else if (this.pad.Width == 320 && this.pad.Height == 200) {
        // This is a 430
        this.pad.x.num = this.pad.Width / 2 - this.pad.KeyWidth / 2 - 2 * this.pad.KeyWidth;
        this.pad.y.num = this.pad.Height / 2;
      } else {
        this.pad.x.num = this.pad.Width / 2 - this.pad.KeyWidth / 2 - 2 * this.pad.KeyWidth;
        this.pad.y.num = this.pad.yText + 7 * this.pad.yLSText;
      }

      var txtOne = new wgssSignatureSDK.Variant();
      txtOne.Set("1");
      var option = new wgssSignatureSDK.Variant();
      option.Set(this.pad.KeyWidth);
      wizCtlG.AddObject(wgssSignatureSDK.ObjectType.ObjectButton, "1", this.pad.x, this.pad.y, txtOne, option, onAddObjectOne);
    } else {
      document.getElementById("statusText").innerHTML += "<br>Text Prompt Add failed";
    }
  }

  function onGetPadWidth(wizCtlG, width, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl GetPadWidth";
      this.pad.Width = width; //document.getElementById("statusText").innerHTML += "<br>WizCtl GetPadWidth: " + this.pad.Width;
      // Font sizes depend on the pad height and width

      document.getElementById("statusText").innerHTML += "<br>Pad height and width: " + this.pad.Height + " " + this.pad.Width; // Set up the font size depending on which pad is in use

      if (this.pad.Width == 396 && this.pad.Height == 100) {
        this.pad.TextSize = 10;
      } else if (this.pad.Width == 320 && this.pad.Height == 200) {
        // This is a 430
        this.pad.TextSize = 9;
      }

      var font = new wgssSignatureSDK.Font(this.pad.Font, this.pad.TextSize);
      var varFont = new wgssSignatureSDK.Variant();
      varFont.Set(font);
      wizCtlG.PutFont(varFont, onPutFont);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl GetPadWidth failed";
    }
  }

  function onGetPadHeight(wizCtlG, height, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl onGetPadHeight";
      this.pad.Height = height;
      document.getElementById("statusText").innerHTML += "<br>WizCtl onGetPadHeight: " + this.pad.Height;
      wizCtlG.GetPadWidth(onGetPadWidth);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl onGetPadHeight failed";
    }
  }

  function onPutFont(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl PutFont"; //wizCtlG.GetPadHeight(onGetPadHeight);
      // We have already got the height and width now so just continue with adding
      // the text objects to the wizctl

      this.pad.x = new wgssSignatureSDK.Variant();
      this.pad.x.Set(this.pad.xText);
      this.pad.y = new wgssSignatureSDK.Variant();
      this.pad.y.Set(this.pad.yText);
      var txtPrompt = new wgssSignatureSDK.Variant();
      txtPrompt.Set("Enter a 4 digit PIN code below");
      var option = new wgssSignatureSDK.Variant();
      wizCtlG.AddObject(wgssSignatureSDK.ObjectType.ObjectText, "txt", this.pad.x, this.pad.y, txtPrompt, option, onAddObjectText);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl PutFont failed";
    }
  }

  function onReset(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Reset";
      document.getElementById("statusText").innerHTML += "<br>Setting font size to " + this.pad.TextSize; // Instead of setting the font first we want to get the pad dimensions so we know
      // what model the pad is and what size to use for the font

      wizCtlG.GetPadHeight(onGetPadHeight);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Reset failed";
    }
  }

  function onClose(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl window closed";
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Close failed";
    }
  }

  function onPadConnect(wizCtlG, padConnect, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status && 1 == padConnect) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl PadConnect";
      wizCtlG.Reset(onReset);
    } else {
      wizCtlG.Close(onClose);
      document.getElementById("statusText").innerHTML += "<br>WizCtl PadConnect failed, closing window";
    }
  }

  function onPutVisibleWindow(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl window set visible";
      wizCtlG.PadConnect(onPadConnect);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl PutVisibleWindow error";
    }
  }

  function onWizCtlPutLicence(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl licence set successfully";
      wizCtlG.PutVisibleWindow(true, onPutVisibleWindow);
    } else {
      document.getElementById("statusText").innerHTML += "WizCtl licensing error: " + status;
    }
  }

  function onCreateWizCtl(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl created";
      wizCtlG.PutLicence("eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImV4cCI6MjE0NzQ4MzY0NywiaWF0IjoxNTYwOTUwMjcyLCJyaWdodHMiOlsiU0lHX1NES19DT1JFIiwiU0lHQ0FQVFhfQUNDRVNTIl0sImRldmljZXMiOlsiV0FDT01fQU5ZIl0sInR5cGUiOiJwcm9kIiwibGljX25hbWUiOiJTaWduYXR1cmUgU0RLIiwid2Fjb21faWQiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImxpY191aWQiOiJiODUyM2ViYi0xOGI3LTQ3OGEtYTlkZS04NDlmZTIyNmIwMDIiLCJhcHBzX3dpbmRvd3MiOltdLCJhcHBzX2lvcyI6W10sImFwcHNfYW5kcm9pZCI6W10sIm1hY2hpbmVfaWRzIjpbXX0.ONy3iYQ7lC6rQhou7rz4iJT_OJ20087gWz7GtCgYX3uNtKjmnEaNuP3QkjgxOK_vgOrTdwzD-nm-ysiTDs2GcPlOdUPErSp_bcX8kFBZVmGLyJtmeInAW6HuSp2-57ngoGFivTH_l1kkQ1KMvzDKHJbRglsPpd4nVHhx9WkvqczXyogldygvl0LRidyPOsS5H2GYmaPiyIp9In6meqeNQ1n9zkxSHo7B11mp_WXJXl0k1pek7py8XYCedCNW5qnLi4UCNlfTd6Mk9qz31arsiWsesPeR9PN121LBJtiPi023yQU8mgb9piw_a-ccciviJuNsEuRDN3sGnqONG3dMSA", onWizCtlPutLicence);
    } else {
      document.getElementById("statusText").innerHTML += "<br>Error creating WizCtl";
    }
  }

  function onSigCtlPutLicence(sigCtlV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>SigCtl licence set successfully";
      this.wizCtl = new wgssSignatureSDK.WizCtl(onCreateWizCtl);
    } else {
      document.getElementById("statusText").innerHTML += "SigCtl licensing error: " + status;
    }
  }

  function onCreateSigCtl(sigCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>SigCtl created";
      sigCtlG.PutLicence("eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImV4cCI6MjE0NzQ4MzY0NywiaWF0IjoxNTYwOTUwMjcyLCJyaWdodHMiOlsiU0lHX1NES19DT1JFIiwiU0lHQ0FQVFhfQUNDRVNTIl0sImRldmljZXMiOlsiV0FDT01fQU5ZIl0sInR5cGUiOiJwcm9kIiwibGljX25hbWUiOiJTaWduYXR1cmUgU0RLIiwid2Fjb21faWQiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImxpY191aWQiOiJiODUyM2ViYi0xOGI3LTQ3OGEtYTlkZS04NDlmZTIyNmIwMDIiLCJhcHBzX3dpbmRvd3MiOltdLCJhcHBzX2lvcyI6W10sImFwcHNfYW5kcm9pZCI6W10sIm1hY2hpbmVfaWRzIjpbXX0.ONy3iYQ7lC6rQhou7rz4iJT_OJ20087gWz7GtCgYX3uNtKjmnEaNuP3QkjgxOK_vgOrTdwzD-nm-ysiTDs2GcPlOdUPErSp_bcX8kFBZVmGLyJtmeInAW6HuSp2-57ngoGFivTH_l1kkQ1KMvzDKHJbRglsPpd4nVHhx9WkvqczXyogldygvl0LRidyPOsS5H2GYmaPiyIp9In6meqeNQ1n9zkxSHo7B11mp_WXJXl0k1pek7py8XYCedCNW5qnLi4UCNlfTd6Mk9qz31arsiWsesPeR9PN121LBJtiPi023yQU8mgb9piw_a-ccciviJuNsEuRDN3sGnqONG3dMSA", onSigCtlPutLicence);
    } else {
      document.getElementById("statusText").innerHTML += "<br>Error creating SigCtl";

      if (wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status) {
        restartSession(wizPin);
      }
    }
  } // Class contains Pad Control data


  function CPadCtl_STU500() {
    this.Model = "STU-300"; //this.Height = WizCtl.PadHeight;
    //this.Width  = WizCtl.PadWidth;
    //document.getElementById("statusText").innerHTML += "<br>Pad width + height: " + this.Width + " " + this.Height;

    this.Font = "Verdana";
    this.TextSize = 14;
    this.xText = 30;
    this.yText = 10;
    this.yLSText = 28;
    this.yButton = "bottom";
    this.xLeftButton = "left";
    this.xCentreButton = "centre";
    this.xRightButton = "right";
    this.KeyWidth = 60; // PIN pad

    this.PinSize = 20;
  }

  if (wgssSignatureSDK.running) {
    if (null == canvas) {
      canvas = document.getElementById("myCanvas");
      ctx = canvas.getContext("2d");
    }

    this.pad = new CPadCtl_STU500();
    this.sigCtl = new wgssSignatureSDK.SigCtl(onCreateSigCtl);
  }
} // End of wizPin()


function wizCapture() {
  var wizCtl;
  var sigCtl;
  var padHeight;
  var padWidth;

  function onRenderBitmap(sigObjV, bmpObj, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      if (bmpObj.isBase64) {
        document.getElementById("statusText").innerHTML += "<br>Base64 bitmap retrieved:<br>";
        document.getElementById("statusText").innerHTML += "<br>" + bmpObj.image.src;
      } else {
        document.getElementById("statusText").innerHTML += "<br>Bitmap retrieved, rendering image...";
      }

      ctx.drawImage(bmpObj.image, 0, 0);
    } else {
      document.getElementById("statusText").innerHTML += "<br>Signature Render Bitmap error: " + status;
    }
  }

  function onGetSignature(sigCtlV, sigObjV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>Rendering Signature into bitmap";
      var flags = wgssSignatureSDK.RBFlags.RenderOutputBase64 | wgssSignatureSDK.RBFlags.RenderColor24BPP;
      sigObjV.RenderBitmap("png", canvas.width, canvas.height, 0.7, 0x00000000, 0x00ffffff, flags, 0, 0, onRenderBitmap);
    } else {
      document.getElementById("statusText").innerHTML += "<br>Error retrieving signature";
    }
  }

  function onDisplay(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>Displaying wizard";
    } else {
      document.getElementById("statusText").innerHTML += "<br>Error displaying";
    }
  }

  function onCloseWizard(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>Retrieving signature";
      sigCtl.GetSignature(onGetSignature);
    } else {
      document.getElementById("statusText").innerHTML += "<br>Error closing wizard";
    }
  }

  function onPutZoom(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      var eventHandler = function eventHandler(ctl, id, type, status) {
        if (wgssSignatureSDK.ResponseStatus.OK == status) {
          document.getElementById("statusText").innerHTML += "<br>EVENT " + id + " " + type;

          if ("ok" == id) {
            document.getElementById("statusText").innerHTML += "<br>Closing wizard";
            wizCtlG.Close(onCloseWizard);
          } else if ("cancel" == id) {
            document.getElementById("statusText").innerHTML += "<br>Closing wizard";
            wizCtlG.Close(function (wiz, status) {});
          }
        } else {
          document.getElementById("statusText").innerHTML += "<br>EVENT WizCtl closed";
        }
      };

      document.getElementById("statusText").innerHTML += "<br>WizCtl Zoom 100.0";
      wizCtlG.SetEventHandler(eventHandler);
      setTimeout(wizCtlG.Display(onDisplay), 1000);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Zoom failed";
    }
  }

  function onAddOk(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Add Ok Button";
      wizCtlG.PutZoom(100, onPutZoom);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Add Ok Button failed";
    }
  }

  function onAddClear(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Add Clear Button";
      var xVar = new wgssSignatureSDK.Variant();
      var yVar = new wgssSignatureSDK.Variant();
      var objData = new wgssSignatureSDK.Variant();
      var options = new wgssSignatureSDK.Variant();
      xVar.Set("right");
      yVar.Set("bottom");
      objData.Set("Ok");
      options.Set(110);
      wizCtlG.AddObject(wgssSignatureSDK.ObjectType.ObjectButton, "ok", xVar, yVar, objData, options, onAddOk);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Add Clear Button failed";
    }
  }

  function onAddCancel(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Add Cancel Button";
      var xVar = new wgssSignatureSDK.Variant();
      var yVar = new wgssSignatureSDK.Variant();
      var objData = new wgssSignatureSDK.Variant();
      var options = new wgssSignatureSDK.Variant();
      xVar.Set("center");
      yVar.Set("bottom");
      objData.Set("Clear");
      options.Set(110);
      wizCtlG.AddObject(wgssSignatureSDK.ObjectType.ObjectButton, "clear", xVar, yVar, objData, options, onAddClear);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Add Cancel Button failed";
    }
  }

  function onPutWho(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Add who text";
      var xVar = new wgssSignatureSDK.Variant();
      var yVar = new wgssSignatureSDK.Variant();
      var objData = new wgssSignatureSDK.Variant();
      var options = new wgssSignatureSDK.Variant();
      xVar.Set("left");
      yVar.Set("bottom");
      objData.Set("Cancel");
      options.Set(110);
      wizCtlG.AddObject(wgssSignatureSDK.ObjectType.ObjectButton, "cancel", xVar, yVar, objData, options, onAddCancel);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Add who text failed";
    }
  }

  function onPutWhy(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Add why text";
      var xVar = new wgssSignatureSDK.Variant();
      var yVar = new wgssSignatureSDK.Variant();
      var objData = new wgssSignatureSDK.Variant();
      var options = new wgssSignatureSDK.Variant();
      xVar.Set("left");
      yVar.Set(10);
      objData.Set("J Smith");
      wizCtlG.AddObject(wgssSignatureSDK.ObjectType.ObjectText, "who", xVar, yVar, objData, options, onPutWho);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Add why text failed";
    }
  }

  function onPutSignature(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Add Signature Object";
      var xVar = new wgssSignatureSDK.Variant();
      var yVar = new wgssSignatureSDK.Variant();
      var objData = new wgssSignatureSDK.Variant();
      var options = new wgssSignatureSDK.Variant();
      xVar.Set("right");
      yVar.Set(400);
      objData.Set("fy");
      wizCtlG.AddObject(wgssSignatureSDK.ObjectType.ObjectText, "why", xVar, yVar, objData, options, onPutWhy);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Add Signature Object failed";
    }
  }

  function onGetFont(wizCtlG, font, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl GetFont:";
      document.getElementById("statusText").innerHTML += "<br>Variant type " + font.type;
      document.getElementById("statusText").innerHTML += "<br>Font name " + font.fontName;
      document.getElementById("statusText").innerHTML += "<br>Font size " + font.fontSize;
      var xVar = new wgssSignatureSDK.Variant();
      var yVar = new wgssSignatureSDK.Variant();
      var objData = new wgssSignatureSDK.Variant();
      var options = new wgssSignatureSDK.Variant();
      objData.Set(sigCtl);
      wizCtlG.AddObject(wgssSignatureSDK.ObjectType.ObjectSignature, "sig", xVar, yVar, objData, options, onPutSignature);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl GetFont failed";
    }
  }

  function onGetPadWidth(wizCtlG, width, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      var textSize;
      padWidth = width; // Font sizes depend on the pad height and width

      document.getElementById("statusText").innerHTML += "<br>Pad height and width: " + padHeight + " " + padWidth; // Set up the font size depending on which pad is in use

      if (padWidth == 396 && padHeight == 100) {
        textSize = 8;
      } else if (padWidth == 320 && padHeight == 200) {
        // This is a 430
        textSize = 9;
      } else textSize = 16;

      var font = new wgssSignatureSDK.Font("Verdana", textSize);
      var varFont = new wgssSignatureSDK.Variant();
      varFont.Set(font);
      wizCtlG.PutFont(varFont, onPutFont);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl GetPadWidth failed";
    }
  }

  function onGetPadHeight(wizCtlG, height, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      padHeight = height;
      document.getElementById("statusText").innerHTML += "<br>WizCtl onGetPadHeight: " + padHeight;
      wizCtlG.GetPadWidth(onGetPadWidth);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl onGetPadHeight failed";
    }
  }

  function onPutFont(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl PutFont";
      wizCtlG.GetFont(onGetFont);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl PutFont failed";
    }
  }

  function onReset(wizCtlG, status) {
    var fontSize;

    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Reset";
      wizCtlG.GetPadHeight(onGetPadHeight);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Reset failed";
    }
  }

  function onClose(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl window closed";
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl Close failed";
    }
  }

  function onPadConnect(wizCtlG, padConnect, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status && 1 == padConnect) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl PadConnect";
      wizCtlG.Reset(onReset);
    } else {
      wizCtlG.Close(onClose);
      document.getElementById("statusText").innerHTML += "<br>WizCtl PadConnect failed, closing window";
    }
  }

  function onPutVisibleWindow(wizCtlG, status) {
    document.getElementById("statusText").innerHTML += "<br>Connecting to pad";

    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl window set visible";
      wizCtlG.PadConnect(onPadConnect);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl PutVisibleWindow error";
    }
  }

  function onWizCtlPutLicence(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl licence created";
      wizCtlG.PutVisibleWindow(true, onPutVisibleWindow);
    } else {
      document.getElementById("statusText").innerHTML += "<br>WizCtl licensing error";
    }
  }

  function onCreateWizCtl(wizCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>WizCtl created";
      wizCtlG.PutLicence("eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImV4cCI6MjE0NzQ4MzY0NywiaWF0IjoxNTYwOTUwMjcyLCJyaWdodHMiOlsiU0lHX1NES19DT1JFIiwiU0lHQ0FQVFhfQUNDRVNTIl0sImRldmljZXMiOlsiV0FDT01fQU5ZIl0sInR5cGUiOiJwcm9kIiwibGljX25hbWUiOiJTaWduYXR1cmUgU0RLIiwid2Fjb21faWQiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImxpY191aWQiOiJiODUyM2ViYi0xOGI3LTQ3OGEtYTlkZS04NDlmZTIyNmIwMDIiLCJhcHBzX3dpbmRvd3MiOltdLCJhcHBzX2lvcyI6W10sImFwcHNfYW5kcm9pZCI6W10sIm1hY2hpbmVfaWRzIjpbXX0.ONy3iYQ7lC6rQhou7rz4iJT_OJ20087gWz7GtCgYX3uNtKjmnEaNuP3QkjgxOK_vgOrTdwzD-nm-ysiTDs2GcPlOdUPErSp_bcX8kFBZVmGLyJtmeInAW6HuSp2-57ngoGFivTH_l1kkQ1KMvzDKHJbRglsPpd4nVHhx9WkvqczXyogldygvl0LRidyPOsS5H2GYmaPiyIp9In6meqeNQ1n9zkxSHo7B11mp_WXJXl0k1pek7py8XYCedCNW5qnLi4UCNlfTd6Mk9qz31arsiWsesPeR9PN121LBJtiPi023yQU8mgb9piw_a-ccciviJuNsEuRDN3sGnqONG3dMSA", onWizCtlPutLicence);
    } else {
      document.getElementById("statusText").innerHTML += "<br>Error creating WizCtl";
    }
  }

  function onSigCtlPutLicence(sigCtlV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      this.wizCtl = new wgssSignatureSDK.WizCtl(onCreateWizCtl);
    } else {
      document.getElementById("statusText").innerHTML += "SigCtl licensing error: " + status;
    }
  }

  function onCreateSigCtl(sigCtlG, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>SigCtl created";
      sigCtlG.PutLicence("eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImV4cCI6MjE0NzQ4MzY0NywiaWF0IjoxNTYwOTUwMjcyLCJyaWdodHMiOlsiU0lHX1NES19DT1JFIiwiU0lHQ0FQVFhfQUNDRVNTIl0sImRldmljZXMiOlsiV0FDT01fQU5ZIl0sInR5cGUiOiJwcm9kIiwibGljX25hbWUiOiJTaWduYXR1cmUgU0RLIiwid2Fjb21faWQiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImxpY191aWQiOiJiODUyM2ViYi0xOGI3LTQ3OGEtYTlkZS04NDlmZTIyNmIwMDIiLCJhcHBzX3dpbmRvd3MiOltdLCJhcHBzX2lvcyI6W10sImFwcHNfYW5kcm9pZCI6W10sIm1hY2hpbmVfaWRzIjpbXX0.ONy3iYQ7lC6rQhou7rz4iJT_OJ20087gWz7GtCgYX3uNtKjmnEaNuP3QkjgxOK_vgOrTdwzD-nm-ysiTDs2GcPlOdUPErSp_bcX8kFBZVmGLyJtmeInAW6HuSp2-57ngoGFivTH_l1kkQ1KMvzDKHJbRglsPpd4nVHhx9WkvqczXyogldygvl0LRidyPOsS5H2GYmaPiyIp9In6meqeNQ1n9zkxSHo7B11mp_WXJXl0k1pek7py8XYCedCNW5qnLi4UCNlfTd6Mk9qz31arsiWsesPeR9PN121LBJtiPi023yQU8mgb9piw_a-ccciviJuNsEuRDN3sGnqONG3dMSA", onSigCtlPutLicence);
    } else {
      document.getElementById("statusText").innerHTML += "<br>Error creating SigCtl";

      if (wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status) {
        restartSession(wizCapture);
      }
    }
  }

  if (wgssSignatureSDK.running) {
    if (null == canvas) {
      canvas = document.getElementById("myCanvas");
      ctx = canvas.getContext("2d");
    }

    sigCtl = new wgssSignatureSDK.SigCtl(onCreateSigCtl);
  }
}

function captureSignature() {
  console.log("Capture Signature Entered");
  console.log(canvas);
  var sigObj;
  var sigCtl;
  var dynCapt;

  function onPutSigData(sigObjV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>PutSigData called";
    } else {
      document.getElementById("statusText").innerHTML += "<br>error on PutSigData: " + status;
    }
  }

  function onGetSigText(sigObjV, data, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>SigText: " + data;
      var vData = new wgssSignatureSDK.Variant();
      vData.type = wgssSignatureSDK.VariantType.VARIANT_BASE64;
      vData.base64 = data;
      sigObjV.PutSigData(vData, onPutSigData);
    } else {
      document.getElementById("statusText").innerHTML += "<br>error on GetSigData: " + status;
    }
  }

  function onGetAdditionalData(sigObjV, additionalData, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>Additional Data/MachineOS: " + additionalData;
      sigObjV.GetSigText(onGetSigText);
    } else {
      document.getElementById("statusText").innerHTML += "<br>error on GetAdditionalData: " + status;
    }
  }

  function onRenderBitmap(sigObjV, bmpObj, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      if (bmpObj.isBase64) {
        document.getElementById("statusText").innerHTML += "<br>Base64 bitmap retrieved:<br>";
        document.getElementById("statusText").innerHTML += "<br>" + bmpObj.image.src;
      } else {
        document.getElementById("statusText").innerHTML += "<br>Bitmap retrieved, rendering image...";
      }

      ctx.drawImage(bmpObj.image, 0, 0);
      sigObjV.GetAdditionalData(wgssSignatureSDK.CaptData.CaptMachineOS, onGetAdditionalData);
    } else {
      document.getElementById("statusText").innerHTML += "<br>Signature Render Bitmap error: " + status;
    }
  }

  function onPutExtraData(sigObjV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>Rendering bitmap";
      var flags = wgssSignatureSDK.RBFlags.RenderOutputPicture | wgssSignatureSDK.RBFlags.RenderColor24BPP;
      sigObjV.RenderBitmap("bmp", canvas.width, canvas.height, 0.7, 0x00000000, 0x00ffffff, flags, 0, 0, onRenderBitmap);
      this.sigObj = sigObjV;
    } else {
      document.getElementById("statusText").innerHTML += "<br>Signature PutExtraData error: " + status;
    }
  }

  function onDynCaptCapture(dynCaptV, sigObjV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      document.getElementById("statusText").innerHTML += "<br>Adding extra data";
      sigObjV.PutExtraData("extra key", "extra value", onPutExtraData);
    } else if (1 == status) {
      document.getElementById("statusText").innerHTML += "<br>Signature capture cancelled by the user";
    } else {
      document.getElementById("statusText").innerHTML += "<br>Signature capture error: " + status;
    }
  }

  function onSigCtlPutLicence(sigCtlV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      dynCapt.Capture(sigCtlV, "RICKY PANDEY", "I hereby authorize NPHL to perform requested tests.", null, null, onDynCaptCapture);
    } else {
      document.getElementById("statusText").innerHTML += "<br>SigCtl constructor error: " + status;
    }
  }

  function onSigCtlConstructor(sigCtlV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      sigCtlV.PutLicence("eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImV4cCI6MjE0NzQ4MzY0NywiaWF0IjoxNTYwOTUwMjcyLCJyaWdodHMiOlsiU0lHX1NES19DT1JFIiwiU0lHQ0FQVFhfQUNDRVNTIl0sImRldmljZXMiOlsiV0FDT01fQU5ZIl0sInR5cGUiOiJwcm9kIiwibGljX25hbWUiOiJTaWduYXR1cmUgU0RLIiwid2Fjb21faWQiOiI3YmM5Y2IxYWIxMGE0NmUxODI2N2E5MTJkYTA2ZTI3NiIsImxpY191aWQiOiJiODUyM2ViYi0xOGI3LTQ3OGEtYTlkZS04NDlmZTIyNmIwMDIiLCJhcHBzX3dpbmRvd3MiOltdLCJhcHBzX2lvcyI6W10sImFwcHNfYW5kcm9pZCI6W10sIm1hY2hpbmVfaWRzIjpbXX0.ONy3iYQ7lC6rQhou7rz4iJT_OJ20087gWz7GtCgYX3uNtKjmnEaNuP3QkjgxOK_vgOrTdwzD-nm-ysiTDs2GcPlOdUPErSp_bcX8kFBZVmGLyJtmeInAW6HuSp2-57ngoGFivTH_l1kkQ1KMvzDKHJbRglsPpd4nVHhx9WkvqczXyogldygvl0LRidyPOsS5H2GYmaPiyIp9In6meqeNQ1n9zkxSHo7B11mp_WXJXl0k1pek7py8XYCedCNW5qnLi4UCNlfTd6Mk9qz31arsiWsesPeR9PN121LBJtiPi023yQU8mgb9piw_a-ccciviJuNsEuRDN3sGnqONG3dMSA", onSigCtlPutLicence);
    } else {
      document.getElementById("statusText").innerHTML += "<br>SigCtl constructor error: " + status;
    }
  }

  function onDynCaptConstructor(dynCaptV, status) {
    if (wgssSignatureSDK.ResponseStatus.OK == status) {
      this.sigCtl = new wgssSignatureSDK.SigCtl(onSigCtlConstructor);
    } else {
      document.getElementById("statusText").innerHTML += "<br>Dynamic Capture constructor error: " + status;

      if (wgssSignatureSDK.ResponseStatus.INVALID_SESSION == status) {
        restartSession(captureSignature);
      }
    }
  }

  if (wgssSignatureSDK.running) {
    if (null == canvas) {
      canvas = document.getElementById("myCanvas");
      ctx = canvas.getContext("2d");
    }

    dynCapt = new wgssSignatureSDK.DynamicCapture(onDynCaptConstructor);
  }
}


/* harmony default export */ __webpack_exports__["default"] = ({
  methods: {
    getSignature: function getSignature() {
      console.log("here");
    },
    storeSignature: function storeSignature() {
      axios__WEBPACK_IMPORTED_MODULE_0___default.a.post('');
    }
  }
});

/***/ }),

/***/ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Signature.vue?vue&type=template&id=4a2ed57f&":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./resources/js/pages/Signature.vue?vue&type=template&id=4a2ed57f& ***!
  \*******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function () {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("section", { staticClass: "container" }, [
    _c("h1", [_vm._v("Signature Example")]),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _vm._m(0),
      _vm._v(" "),
      _c("div", { staticClass: "col-md-8" }),
      _vm._v(" "),
      _c("div", { staticClass: "col-md-3" }, [
        _c(
          "button",
          {
            staticClass: "btn btn-primary btn-flat",
            attrs: { type: "button", id: "addsignature", autocomplete: "off" },
            on: {
              click: function ($event) {
                return _vm.getSignature()
              },
            },
          },
          [
            _c("i", {
              staticClass: "fa fa-floppy-o",
              attrs: { "_v-3293cf8f": "" },
            }),
            _vm._v(" Add Patient Signature\n      "),
          ]
        ),
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-md-3" }),
    ]),
  ])
}
var staticRenderFns = [
  function () {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-md-4" }, [
      _c("canvas", {
        staticStyle: { border: "1px solid #d3d3d3" },
        attrs: { id: "myCanvas", width: "320", height: "56" },
      }),
      _vm._v(" "),
      _c("p", {
        staticStyle: { display: "none" },
        attrs: { id: "statusText" },
      }),
    ])
  },
]
render._withStripped = true



/***/ }),

/***/ "./resources/js/pages/Signature.vue":
/*!******************************************!*\
  !*** ./resources/js/pages/Signature.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Signature_vue_vue_type_template_id_4a2ed57f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Signature.vue?vue&type=template&id=4a2ed57f& */ "./resources/js/pages/Signature.vue?vue&type=template&id=4a2ed57f&");
/* harmony import */ var _Signature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Signature.vue?vue&type=script&lang=js& */ "./resources/js/pages/Signature.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "./node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _Signature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Signature_vue_vue_type_template_id_4a2ed57f___WEBPACK_IMPORTED_MODULE_0__["render"],
  _Signature_vue_vue_type_template_id_4a2ed57f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "resources/js/pages/Signature.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "./resources/js/pages/Signature.vue?vue&type=script&lang=js&":
/*!*******************************************************************!*\
  !*** ./resources/js/pages/Signature.vue?vue&type=script&lang=js& ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Signature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--4-0!../../../node_modules/vue-loader/lib??vue-loader-options!./Signature.vue?vue&type=script&lang=js& */ "./node_modules/babel-loader/lib/index.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Signature.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_4_0_node_modules_vue_loader_lib_index_js_vue_loader_options_Signature_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "./resources/js/pages/Signature.vue?vue&type=template&id=4a2ed57f&":
/*!*************************************************************************!*\
  !*** ./resources/js/pages/Signature.vue?vue&type=template&id=4a2ed57f& ***!
  \*************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Signature_vue_vue_type_template_id_4a2ed57f___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./Signature.vue?vue&type=template&id=4a2ed57f& */ "./node_modules/vue-loader/lib/loaders/templateLoader.js?!./node_modules/vue-loader/lib/index.js?!./resources/js/pages/Signature.vue?vue&type=template&id=4a2ed57f&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Signature_vue_vue_type_template_id_4a2ed57f___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_Signature_vue_vue_type_template_id_4a2ed57f___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ })

}]);