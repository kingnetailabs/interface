const baseURL = "https://api.sakta.top"
export const histoireJson = {
  "version": "1.0.0",
  "model": "model.moc",
  "textures": [
    "histoire.1024/texture_00.png",
    "histoire.1024/texture_01.png",
    "histoire.1024/texture_02.png",
    "histoire.1024/texture_03.png"
  ],
  "layout": {
    "center_x": 0,
    "center_y": -0.05,
    "width": 2
  },
  "hit_areas_custom": {
    "head_x": [
      -1,
      1
    ],
    "head_y": [
      1,
      -1
    ],
    "body_x": [
      -1,
      -1
    ],
    "body_y": [
      1,
      -1
    ]
  },
  "motions": {
    "idle": [
      {
        "file": "motions/idle/NOZOMU_M01.mtn"
      },
      {
        "file": "motions/idle/NOZOMU_M02.mtn"
      }
    ],
    "sleepy": [
      {
        "file": "motions/idle/NOZOMU_M04.mtn"
      }
    ],
    "flick_head": [
      {
        "file": "motions/tap/DK_NOZOMU_0011.mtn"
      },
      {
        "file": "motions/tap/tsumiki_m_14.mtn"
      },
      {
        "file": "motions/tap/m_06.mtn"
      }
    ],
    "tap_body": [
      {
        "file": "motions/tap/DK_NOZOMU_0011.mtn"
      },
      {
        "file": "motions/tap/m_13.mtn"
      }
    ],
    "talk": [
      {
        "file": "motions/tap/DK_NOZOMU_0041.mtn"
      },
      {
        "file": "motions/tap/DK_NOZOMU_0061.mtn"
      },
      {
        "file": "motions/tap/DK_NOZOMU_0067.mtn"
      }
    ],
    "rest": [
      {
        "file": "motions/tap/tsumiki_m_01.mtn"
      },
      {
        "file": "motions/tap/tsumiki_m_09.mtn"
      },
      {
        "file": "motions/tap/tsumiki_m_13.mtn"
      },
      {
        "file": "motions/tap/tsumiki_m_19.mtn"
      },
      {
        "file": "motions/tap/tsumiki_m_21.mtn"
      }
    ],
    "": [
      {
        "file": "motions/tap/tsumiki_m_01.mtn"
      },
      {
        "file": "motions/tap/tsumiki_m_09.mtn"
      },
      {
        "file": "motions/tap/tsumiki_m_13.mtn"
      },
      {
        "file": "motions/tap/tsumiki_m_19.mtn"
      },
      {
        "file": "motions/tap/tsumiki_m_21.mtn"
      }
    ]
  },
  "url": `${baseURL}/profile/upload/model/histoire/model.json`
}