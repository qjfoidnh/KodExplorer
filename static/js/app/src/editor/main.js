/*! power by kodcloud ver4.46(2021-07-14) [build 1626241873302] */
define("app/src/editor/main", ["lib/jquery-lib", "lib/util", "lib/ztree/ztree", "lib/contextMenu/jquery-contextMenu", "lib/artDialog/jquery-artDialog", "../../common/taskTap", "../../common/core", "../../common/tpl/upload.html", "../../common/tpl/formMake.html", "../../common/core.tools", "../../common/core.upload", "../../common/core.api", "../../common/core.playSound", "../../common/core.formMake", "../../common/rightMenuExtence", "../../app/appBase", "../../app/editor", "../../app/openWith", "../../app/html", "../../common/tpl/copyright.html", "../../common/tpl/themeDIY.html", "../../common/rightMenu", "./ui", "../../path/path", "../../path/pathOperate", "../../path/tpl/share.html", "../../path/tpl/fileinfo/fileInfo.html", "../../path/tpl/fileinfo/pathInfo.html", "../../path/tpl/fileinfo/pathInfoMore.html", "../../path/tpl/appEdit.html", "../../path/clipboard", "../../path/search", "../../path/tpl/search.html", "../../path/tpl/searchList.html", "../../path/tpl/file/create.html", "../../common/tree", "../explorer/fileListResize"],
function(a, b, c) {
	Config = {
		TreeId: "folder-list-tree",
		AnimateTime: 200,
		pageApp: "editor",
		treeAjaxURL: "explorer/treeList&app=editor"
	},
	a("lib/jquery-lib"),
	a("lib/util"),
	a("lib/ztree/ztree"),
	a("lib/contextMenu/jquery-contextMenu"),
	a("lib/artDialog/jquery-artDialog"),
	TaskTap = a("../../common/taskTap"),
	core = a("../../common/core"),
	rightMenu = a("../../common/rightMenu"),
	ui = a("./ui"),
	ui.path = a("../../path/path"),
	tree = a("../../common/tree"),
	ui.fileListResize = a("../explorer/fileListResize"),
	ui.tree = tree,
	$(document).ready(function() {
		rightMenu.initEditor(),
		core.init(),
		$(".init-loading").fadeOut(450).addClass("pop_fadeout"),
		G.project.length > 1 && (Config.treeAjaxURL += "&project=" + urlEncode(G.project)),
		ui.init(),
		ui.fileListResize.init(),
		TaskTap.init()
	})
});;;;;;;
define("app/common/taskTap", [],
function(a, b) {
	var c = {},
	d = "",
	e = 160,
	f = function() {
		$(".task-tab .tab").die("mouseenter").live("mouseenter",
		function(a) {
			$(this).hasClass("this") || $(this).addClass("hover")
		}).die("mouseleave").live("mouseleave",
		function() {
			$(this).removeClass("hover")
		})
	},
	g = function(a) {
		var b = a.attr("id"),
		c = $.dialog.list[b];
		if (void 0 == c) return void l(b);
		var d = $("." + b);
		"hidden" == d.css("visibility") ? c.display(!0).zIndex() : d.hasClass("aui-state-focus") ? c.display(!1) : c.zIndex()
	},
	h = function() {
		var a, b, c, d, f = !1,
		h = !1,
		i = 0,
		j = 0,
		k = 0,
		l = 0,
		m = 0,
		n = 0;
		$(".task-tab .tab").die("mousedown").live("mousedown",
		function(b) {
			1 == b.which && (a = $(this), o(b), this.setCapture && this.setCapture(), $(document).mousemove(function(a) {
				p(a)
			}), $(document).one("mouseup",
			function(b) {
				r(),
				this.releaseCapture && this.releaseCapture(),
				Math.abs(b.pageX - i) < 10 && g(a)
			}))
		});
		var o = function(d) {
			f = !0,
			h = !0,
			i = d.pageX,
			$tab_parent = $(".task-tab"),
			b = $(".task-tab .tab"),
			$(".tasktab-dragging").remove(),
			c = a.clone().addClass("tasktab-dragging").prependTo("body"),
			l = $sizeInt(b.css("margin-right")),
			m = $tab_parent.width(),
			n = $tab_parent.get(0).getBoundingClientRect().left,
			n += $(window).scrollLeft(),
			j = a.get(0).getBoundingClientRect().left,
			k = $sizeInt(b.css("width"));
			var e = a.get(0).getBoundingClientRect().top - $sizeInt(a.css("margin-top")),
			g = d.clientX - i + j;
			$("body").prepend("<div class='dragMaskView'></div>"),
			c.css({
				width: k + "px",
				top: e,
				left: g
			}),
			a.css("opacity", 0)
		},
		p = function(d) {
			if (h) {
				window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(),
				0 == f && o(d);
				var e = d.clientX - i + j;
				n > e || e > n + m - k || (c.css("left", e), b.each(function(b) {
					var c = $(this).get(0).getBoundingClientRect().left;
					if (e > c && c + k / 2 + l > e) {
						if (a.attr("id") == $(this).attr("id")) return;
						q($(this).attr("id"), "left")
					}
					if (e > c - k / 2 + l && c > e) {
						if (a.attr("id") == $(this).attr("id")) return;
						q($(this).attr("id"), "right")
					}
				}))
			}
		},
		q = function(c, f) {
			if (!a.is(":animated") || d != c) {
				d = c,
				a.stop(!0, !0),
				$(".insertTemp").remove(),
				b = $(".task-tab .tab");
				var g = a.width(),
				h = $(".task-tab #" + c),
				i = a.clone(!0).insertAfter(a).css({
					"margin-right": "0px",
					border: "none"
				}).addClass("insertTemp");
				"left" == f ? a.after(h).css("width", "0px") : (a.before(h).css("width", "0px"), h.before(i)),
				a.animate({
					width: g + "px"
				},
				e),
				i.animate({
					width: "0px"
				},
				e,
				function() {
					$(this).remove(),
					b = $(".task-tab .tab")
				})
			}
		},
		r = function() {
			h = !1,
			f = !1,
			startTime = 0,
			$(".dragMaskView").remove(),
			void 0 != c && (j = a.get(0).getBoundingClientRect().left, c.animate({
				left: j + "px"
			},
			e,
			function() {
				a.css("opacity", 1),
				$(this).remove()
			}))
		}
	},
	i = function(a) {
		var b = 110,
		c = b,
		d = b + 12,
		f = $(".task-tab .tab"),
		g = $(".task-tab .tabs").width() - 10,
		h = f.length,
		i = Math.floor(g / d);
		switch (h > i && (c = Math.floor(g / h) - 12), a) {
		case "add":
			$(".task-tab .tabs .this").css("width", "0").animate({
				width: c + "px"
			},
			e);
		case "close":
			f.animate({
				width:
				c + "px"
			},
			e);
			break;
		case "resize":
			f.css("width", c + "px")
		}
	},
	j = function(a, b) {
		$(".task-tab").removeClass("hidden");
		var d = b.replace(/<[^>]+>/g, ""),
		e = '<div class="tab menu-taskbar" id="' + a + '" title="' + d + '">' + b + "</div>";
		$(e).insertBefore(".task-tab .last"),
		i("add"),
		c[a] = {
			id: a,
			name: name
		}
	},
	k = function(a) {
		$(".task-tab .this").removeClass("this"),
		$(".task-tab #" + a).addClass("this"),
		d = a
	},
	l = function(a) {
		$(".task-tab #" + a).animate({
			width: 0
		},
		e,
		function() {
			if ($(".task-tab #" + a).remove(), i("close"), 0 == $(".tabs .tab").length && !core.isApp("desktop")) {
				var b = 31;
				$(".task-tab").animate({
					bottom: "-" + b + "px"
				},
				200, 0,
				function() {
					$(this).css({
						bottom: "0px"
					}).addClass("hidden")
				})
			}
		}),
		delete c[a]
	},
	m = function() {
		$('<i class="menu-taskbar"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: ".menu-taskbar",
			items: {
				"quit-others": {
					name: LNG.close_others,
					className: "quit-others",
					icon: "remove-circle",
					accesskey: "o"
				},
				quit: {
					name: LNG.close,
					className: "quit",
					icon: "remove",
					accesskey: "q"
				}
			},
			callback: function(a, b) {
				var c = b.$trigger.attr("id"),
				d = $.dialog.list[c];
				switch (a) {
				case "quit-others":
					$.each($.dialog.list,
					function(a, b) {
						c != a && b.close()
					});
					break;
				case "quit":
					d.close()
				}
			}
		})
	},
	n = function() {
		$.contextMenu({
			zIndex: 9999,
			selector: ".task-tab",
			items: {
				closeAll: {
					name: LNG.dialog_close_all,
					icon: "remove-circle",
					accesskey: "q"
				},
				showAll: {
					name: LNG.dialog_display_all,
					icon: "th-large",
					accesskey: "s"
				},
				hideAll: {
					name: LNG.dialog_min_all,
					icon: "remove",
					accesskey: "h"
				}
			},
			callback: function(a, b) {
				var c = b.$trigger.attr("id");
				$.dialog.list[c];
				switch (a) {
				case "showAll":
					$.each($.dialog.list,
					function(a, b) {
						b.display(!0)
					});
					break;
				case "hideAll":
					$.each($.dialog.list,
					function(a, b) {
						b.display(!1)
					});
					break;
				case "closeAll":
					$.each($.dialog.list,
					function(a, b) {
						b.close()
					})
				}
			}
		})
	};
	return {
		add: j,
		focus: k,
		close: l,
		init: function() {
			var a = '<div class="task-tab"><div class="tabs"><div class="last" style="clear:both;"></div></div></div>';
			$(a).appendTo("body"),
			core.isApp("desktop") || $(".task-tab").addClass("hidden"),
			$(window).bind("resize",
			function() {
				i("resize")
			}),
			f(),
			m(),
			n(),
			h()
		}
	}
});; !
function($) { !
	function($, n, t, i, r, o, e, c, a, f, u, d, v, s, h, E, C, l, A, p, G, g, m, b, S, O, I, L, J, M, y, B, Q, k, F, P, Z, N, H, R, w, X, V, D, _, x, T, Y, z, K, W, U, j, q, $n, nn, tn, rn, on, en, cn, an, fn, un, dn, vn, sn, hn, En, Cn, ln, An, pn, Gn, gn, mn, bn, Sn, On, In, Ln, Jn, Mn, yn, Bn, Qn, kn, Fn, Pn, Zn, Nn, Hn, Rn, wn, Xn, Vn, Dn, _n, xn, Tn, Yn, zn, Kn, Wn, Un, jn, qn, $t, nt, tt, it, rt, ot, et, ct, at, ft, ut, dt, vt, st, ht, Et, Ct, lt, At, pt, Gt, gt, mt, bt, St, Ot, It, Lt, Jt, Mt, yt, Bt, Qt, kt, Ft, Pt, Zt, Nt, Ht, Rt, wt, Xt, Vt, Dt, _t, xt, Tt, Yt, zt, Kt, Wt, Ut, jt, qt, $i, ni, ti, ii, ri, oi, ei, ci, ai, fi, ui, di, vi, si, hi, Ei, Ci, li, Ai, pi, Gi, gi, mi, bi, Si, Oi, Ii, Li, Ji, Mi, yi, Bi, Qi, ki, Fi, Pi, Zi, Ni, Hi, Ri, wi, Xi, Vi, Di, _i, xi, Ti, Yi, zi, Ki, Wi, Ui, ji, qi, $r, nr, tr, ir, rr, or, er, cr, ar, fr, ur, dr, vr, sr, hr, Er, Cr, lr, Ar, pr, Gr, gr, mr, br, Sr, Or, Ir, Lr, Jr, Mr, yr, Br, Qr, kr, Fr, Pr, Zr, Nr, Hr, Rr, wr, Xr, Vr, Dr, _r, xr, Tr, Yr, zr, Kr, Wr, Ur, jr, qr, $o, no, to, io, ro, oo, eo, co, ao, fo, uo, vo, so, ho, Eo, Co, lo, Ao, po, Go, go, mo, bo, So, Oo, Io, Lo, Jo, Mo, yo, Bo, Qo, ko, Fo, Po, Zo, No, Ho, Ro, wo, Xo, Vo, Do, _o, xo, To, Yo, zo, Ko, Wo, Uo, jo, qo, $e, ne, te, ie, re, oe, ee, ce, ae, fe, ue, de, ve, se, he, Ee, Ce, le, Ae, pe, Ge, ge, me, be, Se, Oe, Ie, Le, Je, Me, ye, Be, Qe, ke, Fe, Pe, Ze, Ne, He, Re, we, Xe, Ve, De, _e, xe, Te, Ye, ze, Ke, We, Ue, je, qe, $c, nc, tc, ic, rc, oc, ec, cc, ac, fc, uc, dc, vc, sc, hc, Ec, Cc, lc, Ac, pc, Gc, gc, mc, bc, Sc, Oc, Ic, Lc, Jc, Mc, yc, Bc, Qc, kc, Fc, Pc, Zc, Nc, Hc, Rc, wc, Xc, Vc, Dc, _c, xc, Tc, Yc, zc, Kc, Wc, Uc, jc, qc, $a, na, ta, ia, ra, oa, ea, ca, aa, fa, ua, da, va, sa, ha, Ea, Ca, la, Aa, pa, Ga, ga, ma, ba, Sa, Oa, Ia, La, Ja, Ma, ya, Ba, Qa, ka, Fa, Pa, Za, Na, Ha, Ra, wa, Xa, Va, Da, _a, xa, Ta, Ya, za, Ka, Wa, Ua, ja, qa, $f, nf, tf, rf, of, ef, cf, af, ff, uf, df, vf, sf, hf, Ef, Cf, lf, Af, pf, Gf) {
		$[t](i, [r, o, e, c, a, f, u, d, v, s, h, E, C, l],
		function(n) {
			$[A] = n(r),
			$[p] = n(o);
			var t = n(e),
			i = n(c),
			gf = n(a),
			mf = n(f),
			bf = n(u);
			n(d),
			$[G] = n(v),
			n(s),
			n(h),
			n(E),
			$[g] = function(n) {
				return $[m](n)
			},
			$[b] = function(n) {
				return $[S](n)
			};
			var Sf = function() {
				$[I][O] = n,
				$[J][L] || ($[J][L] = function(n, t) {
					$[J][M][n] = t
				},
				$[J][y] = function(n, t) {
					$[J][M][B][n] = t
				}),
				$[J][L](Q, !k),
				$[J][L](F, !P),
				$[J][y](Z, {
					$: $[N],
					window: $[I],
					log: $[R][H],
					core: $[w],
					pathTools: $[I][X],
					inArray: $[V]
				}),
				$[J][M][B][X] = $[I][X],
				$[J][M][Q] = !k,
				D == $[x][_] ? ($[J][M][T] = !k, $[J][M][Y] = !k, $[J][M][z] = !P) : ($[J][M][T] = !P, $[J][M][Y] = !P, $[J][M][z] = !k)
			},
			Of = function() {
				Sf(),
				K != typeof $[x] && (k != $[x][W] && $[N](j)[U](), $[x][W] || $[w][q]($n) || k == $[w][q](nn) || $[N](tn)[U](), $[x][rn] && on == $[x][rn][en] && ($[N][an][M][cn] = !k), If()),
				$[fn]() && ($[N](dn)[un](vn), n[sn](hn,
				function() {
					$[N](function() {
						$[Cn][En]($[ln][dn])
					})
				}), $[N](pn)[An](Gn,
				function() {
					var n = $[N](this);
					$[N](this)[gn](mn) || (n = $[N](this)[bn](Sn)),
					n[On](In),
					$[N][Jn][Ln]()
				}), $[N](Mn)[An](yn,
				function() {
					var n = $[N](this)[Bn](Qn);
					n[kn](Fn, Pn),
					$[Zn](function() {
						n[kn](Fn, Nn)
					},
					Hn)
				})),
				$[N](wn)[Rn](Xn,
				function(n) {
					if (P == $[N](n[Dn])[bn](Qn)[Vn]) try {
						$[N][Jn][Ln]()
					} catch(n) {}
				}),
				$[N](dn)[Xn](function() {
					$[xn][_n](Tn,
					function(n) {
						$[Yn] != n && n[N](dn)[On](Xn)
					})
				}),
				$[N][an][M][cn] && $[zn]([Kn, Wn, Un, Sn, jn, qn, $t, nt], [tt, it, rt, ot]),
				$[N](ct)[et](at, ft),
				$[N][ut]({
					headers: {
						"X-CSRF-TOKEN": $[vt][dt](st)
					}
				}),
				$[N](ht)[Xn](function() {
					var n = $[N](this)[et](Et);
					$[vt][Ct](Et, n),
					$[I][At][lt]()
				}),
				$[N](ht)[kn]({
					padding: pt
				}),
				$[N](Gt + $[vt][dt](Et) + gt)[kn]({
					background: mt,
					color: bt
				}),
				$[w][St](),
				$[w][It][Ot]();
				for (var t = P; t < $[I][Lt][Vn]; t++) try {
					$[I][Lt][t]()
				} catch(i) {
					$[R][Jt](Mt, i)
				}
				$[yt][On](Bt),
				Lf()
			},
			If = function() {
				var n = $[I][At],
				t = n[Qt] ? kt + n[Qt] : Tn;
				$[x][Ft] = n[Pt] + Zt + n[Nt] + t + Ht,
				$[x][Rt] = $[wt]($[x][Ft], Ht) + n[Vt][Xt](Dt, Tn);
				var i = $[x][_t][Xt](Dt, Tn);
				$[x][Ft] + $[xt](i, Ht) != $[x][Rt] && ($[x][Ft] = $[wt]($[x][Rt], i) + Ht),
				$[x][Tt] = $[x][Rt] + Yt,
				zt == $[x][Wt][Kt] && ($[x][Tt] = $[x][Tt][Xt](Yt, Ut)),
				$[vt][Ct](jt, $[x][Ft]),
				$[vt][Ct](qt, $[x][Rt]),
				$[vt][Ct]($i, $[x][ni], ti)
			},
			Lf = function() {
				$[fn]() || n[sn]([ii, ri],
				function() {
					var n = $[N](oi);
					n[ei]({
						className: ci,
						liveEvents: !P,
						slide: !k,
						alignTo: ai,
						alignX: fi,
						alignY: ui,
						showAniDuration: di,
						hideAniDuration: vi,
						offsetY: si,
						offsetX: hi,
						showTimeout: function() {
							var n = Ei;
							return $[N](this)[et](Ci) && (n = $[li]($[N](this)[et](Ci))),
							n
						},
						content: function() {
							var n = $[N](this)[Ai](pi);
							if ($[N](this)[et](Gi)) {
								var t = $[N]($[N](this)[et](Gi));
								n = t[gi](mi) || t[gi](bi) ? t[Si]() : t[wn]()
							}
							return n = n ? n: Tn,
							n[Xt](Oi, Ii)
						}
					}),
					$[N](dn)[Rn](yn,
					function() {
						$[N](Li)[U](),
						$[N][Ji](Mi, yi)
					})[Rn](In,
					function() {
						$[N][Ji](Tn, yi)
					}),
					$[N](Bi)[An](Qi,
					function() {
						$[N](n)[ei](ki),
						$[N](Li)[U]()
					})
				})
			};
			return {
				init: Of,
				serverDwonload: i[Fi],
				upload: i[Pi],
				uploadInit: i[Ot],
				playSound: mf[Zi],
				playSoundFile: mf[Ni],
				tools: t,
				api: gf,
				formMake: bf,
				getPathIcon: function(n, t) {
					if (t = void P == t ? Tn: t, Hi == $[N][Ri](n)) {
						var i = $[wi]($[wi](n), Ht);
						if (n = {},
						Xi != i[Vi](P, k) || i[Di](Ht)[Vn] > k) return {
							icon: Tn,
							name: Tn
						};
						n[_i] = i[xi](Ti),
						n[Yi] = i[Di](kt)[k]
					}
					var r = {};
					r[$[x][zi]] = {
						icon: Ki,
						name: $[Ui][Wi]
					},
					r[$[x][ji]] = {
						icon: qi
					},
					r[$[x][$r]] = {
						icon: nr
					},
					r[$[x][tr]] = {
						icon: Ki
					},
					r[$[x][ir]] = {
						icon: rr,
						name: $[Ui][rr]
					},
					r[$[x][or]] = {
						icon: er,
						name: $[Ui][cr]
					},
					r[$[x][ar]] = {
						icon: fr,
						name: $[Ui][ur]
					},
					r[$[x][dr]] = {
						icon: vr,
						name: $[Ui][sr]
					};
					var o = r[n[_i]];
					return n[_i] == $[x][zi] && $[x][hr] != n[Yi] ? o = {
						icon: Er,
						name: t
					}: n[_i] == $[x][ji] && Cr == n[lr] && (o = {
						icon: qi
					}),
					void P == o && (o = {
						icon: Tn,
						name: Tn
					}),
					void P == o[Ar] && (o[Ar] = t),
					o
				},
				isFileView: function() {
					var n = $[x][pr] + Gr + $[x][gr];
					return mr == n || br == n ? !P: !k
				},
				isSystemPath: function(n) {
					var n = $[wi]($[wi](n), Ht);
					if (void P == n || Xi != n[Vi](P, k) || n[Di](Ht)[Vn] > k) return ! k;
					var t = n[xi](Sr),
					i = [$[x][zi], $[x][$r], $[x][ir], $[x][or], $[x][ar], $[x][dr]];
					return - k !== $[N][V](t[P], i) ? !P: !k
				},
				pathPre: function(n) {
					if (n = $[wi]($[wi](n), Ht), void P == n || Xi != n[Vi](P, k)) return Tn;
					var t = n[xi](Or);
					return t[P]
				},
				contextmenu: function(n) {
					try {
						$[N][Jn][Ln]()
					} catch(t) {}
					var t = n || $[I][Ir];
					return t ? t && $[N](t[Dn])[gi](bi) || $[N](t[Dn])[gi](mi) || $[N](t[Dn])[gi](Lr) || $[N](t[Dn])[gi](Jr) || P != $[N](t[Dn])[bn](Mr)[Vn] || P != $[N](t[Dn])[bn](yr)[Vn] || P != $[N](t[Dn])[bn](Br)[Vn] || P != $[N](t[Dn])[bn](Qr)[Vn] ? !P: !k: !P
				},
				pathThis: function(n) {
					if (!n || Ht == n) return Tn;
					var t = $[wt](this[kr](n), Ht),
					i = t[Fr](Ht),
					r = t[Pr](i + k);
					if (P == r[Zr](Nr)) {
						r = $[Hr](r[Pr](r[Zr](Rr)));
						var o = r[Di](Ht);
						r = o[o[Vn] - k],
						Tn == r && (r = o[o[Vn] - wr])
					}
					return r
				},
				pathClear: function($) {
					if (!$) return Tn;
					var n = $[Xt](Xr, Ht);
					return n = n[Xt](Vr, Ht),
					n = n[Xt](Dr, Ht)
				},
				pathFather: function(n) {
					var t = $[wt](this[kr](n), Ht),
					i = t[Fr](Ht);
					return t[Pr](P, i + k)
				},
				pathExt: function(n) {
					var t = $[wi](n, Ht);
					return - k != t[Fr](Ht) && (t = t[Pr](t[Fr](Ht) + k)),
					-k != t[Fr](Gr) ? t[Pr](t[Fr](Gr) + k)[_r]() : t[_r]()
				},
				pathUrlEncode: function(n) {
					if (!n) return Tn;
					var t = $[xr](n);
					return t = t[Xt](Tr, Ht)
				},
				path2url: function(n, t) {
					if (Yr == n[Pr](P, zr)) return n;
					void P == t && (t = !P);
					var i, r = this[kr](n);
					return $[x][W] && t && r[Vi](P, $[x][Kr][Vn]) == $[x][Kr] ? i = r[Vi](P, $[x][Wr][Vn]) == $[x][Wr] ? $[x][Rt] + this[Ur](r[Xt]($[x][Wr], Tn)) : $[x][Ft] + this[Ur](r[Xt]($[x][Kr], Tn)) : (i = $[x][Tt] + jr + $[x][qr] + Rr + $[xr](r), K != typeof $[x][$o] && (i = $[x][Tt] + no + $[x][Er] + to + $[x][io] + Rr + $[xr](r))),
					i
				},
				pathCommon: function(n) {
					if (Yr == n[Pr](P, zr)) return $[xr](n);
					if (n[Pr](P, $[x][zi][Vn]) == $[x][zi]) return $[xr](n);
					if ($[x][ro] && $[x][ro][oo]) return n;
					var t = this[kr](n),
					i = $[xr](t);
					return K != typeof $[x][$o] && (i = $[xr]($[x][zi] + kt + $[x][Er] + Ht + $[x][ro][Ar] + t)),
					i
				},
				isApp: function(n) {
					if (K == typeof $[eo]) return ! k;
					var t = $[eo][co];
					return Hi == typeof n ? t == n: $[N][ao](n) && -k !== $[N][V](t, n) ? !P: !k
				},
				pathReadable: function(n) {
					if (fo != typeof $[x][uo]) return ! P;
					for (var t = $[x][uo][vo], i = P; i < t[Vn]; i++) if (t[i][so] == n) return void P == t[i][ho] || k == t[i][ho] ? !P: !k;
					t = $[x][uo][Eo];
					for (var i = P; i < t[Vn]; i++) if (t[i][so] == n) return void P == t[i][ho] || k == t[i][ho] ? !P: !k;
					return ! P
				},
				pathCurrentWriteable: function() {
					return $[w][Co](lo) ? !k: $[x][uo][Ao] ? $[x][uo][Ao][po] : !k
				},
				authCheck: function(n, t) {
					return $[x][W] ? !P: $[go][Go](n) && k == $[go][n] ? !P: (t && (t = t === !P ? $[Ui][mo] : t, $[So][bo](t, !k)), !k)
				},
				authCheckGroup: function(n, t) {
					if (t = t || $[x][Oo], k == $[x][W] || !$[x][Io]) return ! P;
					var i = t[xi]($[Lo](Ht + $[x][ji] + Jo));
					if (i && wr == i[Vn] && $[x][Io][i[k]]) {
						var r = $[x][Io][i[k]];
						if (!r[Go](n) || k != r[n]) return ! k
					}
					return ! P
				},
				ajaxError: function(n) {
					var t = n[Mo],
					i = $[N][an][Bo][yo];
					return $[So][Qo]($[Ui][ko], !k),
					Fo == t[Pr](P, Po) ? void $[Zn](function() {
						var n = $[xn][_n]();
						n[At][lt]()
					},
					Zo) : (P == n[No] && Tn == t && (t = Ho), t = Ro + t + wo, i || $[N][an]({
						id: yo,
						padding: P,
						width: Xo,
						height: Vo,
						fixed: !P,
						resize: !P,
						ico: $[w][Do](Jt),
						title: _o,
						content: Tn
					}), void $[N][xo]($[N](To), t))
				},
				fileGet: function(n, t, i) {
					var r = Yo;
					Yr == n[Pr](P, zr) && (r = zo);
					var o = $[x][Tt] + Ko + r + Wo + $[xr](n);
					K != typeof $[x][$o] && (o = $[x][Tt] + Uo + $[x][Er] + to + $[x][io] + jo + r + Wo + $[xr](n)),
					(n[qo](Ko) >= P || n[qo]($e) >= P) && (o = n),
					$[N][ne]({
						url: o,
						dataType: te,
						error: function(n, t, r) {
							$[w][ie](n, t, r),
							re == typeof i && i()
						},
						success: function(n) {
							n[oe] && re == typeof t && (k == n[Ai][ee] && (n[Ai][ce] = $[ae](n[Ai][ce])), t(n[Ai][ce], n, o)),
							n[oe] || re == typeof i && i(n[Ai])
						}
					})
				},
				fileInfo: function(n, t) {
					var i = $[x][Tt] + fe;
					K != typeof $[x][$o] && (i = $[x][Tt] + ue + $[x][Er] + to + $[x][io]),
					$[N][ne]({
						url: i,
						type: de,
						dataType: te,
						data: n,
						error: $[w][ie],
						success: function($) {
							re == typeof t && t($, n)
						}
					})
				},
				fileLink: function(n, t) {
					if (n = this[kr](n), $[x][W] && n[Vi](P, $[x][Kr][Vn]) == $[x][Kr]) {
						var i = $[x][Ft] + this[Ur](n[Xt]($[x][Kr], Tn));
						return void(re == typeof t && t(i, n))
					}
					var r = ve + $[xr](n) + se;
					this[he](r,
					function(i) {
						var r = i[oe] ? i[Ai][Ee] : !k;
						return r ? void(re == typeof t && t(r, n)) : void $[So][bo]($[Ui][Ce] + le + $[Ui][Ae], !k)
					})
				},
				setting: function(n) {
					void P == n && (n = $[x][W] ? pe: Er);
					var t = Ge,
					i = Ge;
					$[fn]() && (t = ge, i = ge),
					$[xn][_n](me) ? $[xn][_n](me,
					function(t) {
						t[Se][be](n),
						$[N][an][Bo][Ie][Oe](!P)
					}) : $[N][an][Le]($[x][Tt] + Je + n, {
						id: Ie,
						fixed: !P,
						ico: $[w][Do](Me),
						resize: !P,
						title: $[Ui][Me],
						width: t,
						height: t
					})
				},
				copyright: function() {
					var t = n(C),
					i = $[J][ye](t),
					r = $[xn][_n]();
					r[Be][an]({
						id: Qe,
						bottom: P,
						right: P,
						simple: !P,
						resize: !k,
						disableTab: !P,
						title: $[Ui][ke],
						width: Fe,
						padding: on,
						fixed: !P,
						content: i({
							LNG: $[Ui],
							G: $[x]
						})
					}),
					r[N](Pe)[un](Ze)
				},
				qrcode: function(n, t) {
					Ne == n[Pr](P, wr) && (n = $[x][Tt] + n[Pr](wr));
					var i = $[x][Tt] + He + $[Re]($[xr](n)),
					r = we + $[Re](n) + Xe + n + Ve + i + De;
					$[N][an]({
						follow: t,
						fixed: !P,
						resize: !k,
						title: $[Ui][_e],
						padding: xe,
						content: r
					})
				},
				appStore: function() {
					var n = $[xn][_n]();
					n[N][an][Le]($[x][Tt] + Te, {
						id: Ye,
						fixed: !P,
						ico: $[w][Do](ze),
						resize: !P,
						title: $[Ui][Ye],
						width: Ke,
						height: Ke
					})
				},
				openWindow: function(n, t, i, r) {
					t = t ? t: $[Ui][bo],
					i = i ? i: Ke,
					r = r ? r: We,
					$[fn]() && (i = ge, r = ge);
					var o = $[xn][_n](),
					e = o[N][an][Le](n, {
						ico: Tn,
						title: t,
						fixed: !P,
						resize: !P,
						width: i,
						height: r
					});
					return e
				},
				openWindowFull: function(n, t) {
					return $[w][Ue](n, t, ge, ge)
				},
				openWindowBig: function(n, t) {
					return $[w][Ue](n, t, je, je)
				},
				openDialog: function(n, t, i, r, o) {
					if (n) {
						void P == r && (r = qe + $[$c]());
						var e = nc + r + tc + $[ic](n) + rc,
						c = $[xn][_n](),
						a = {
							id: r,
							fixed: !P,
							title: i,
							ico: t,
							width: Ke,
							height: oc,
							padding: P,
							content: e,
							resize: !P
						};
						a = $[N][ec]({},
						a, o);
						var f = c[N][an](a);
						return f
					}
				},
				openApp: function(n) {
					if (cc == n[Ri]) {
						var t = n[Do]; - k == n[Do][Zr]($[x][ac]) && Yr != n[Do][Vi](P, zr) && (t = $[x][ac] + fc + n[Do]),
						uc != typeof n[dc] && -k === n[dc][Zr](vc) && (n[dc] = $[li](n[dc])),
						uc != typeof n[sc] && -k === n[sc][Zr](vc) && (n[sc] = $[li](n[sc])),
						n[dc] || (n[dc] = je),
						n[sc] || (n[sc] = We);
						var i = {
							resize: n[hc],
							fixed: !P,
							ico: $[w][Ec](t),
							title: n[Ar][Xt](Cc, Tn),
							width: n[dc],
							height: n[sc],
							simple: n[lc],
							padding: P
						},
						r = n[ce];
						if (Ac == $[N][pc]()[Pt] && Yr == $[N][pc](r)[Pt]) return void $[I][Le](r);
						var o = $[xn][_n]();
						Gc == $[w][gc](r) ? (i[ce] = $[w][mc](r), o[N][an](i)) : o[N][an][Le](r, i)
					} else {
						var e = n[ce];
						$[Lo](Xi + e + bc)
					}
				},
				update: function() {
					$[Zn](function() {
						var t = $[ae](Sc) + Oc + $[$c]();
						n[sn](t,
						function($) {
							try {
								$[Ic](Lc)
							} catch(n) {}
						})
					},
					vi)
				},
				openPath: function(n) {
					$[w][Co](Jc) ? $[Mc][so][Bo](n, bo) : $[w][Jc](n)
				},
				explorer: function(n, t) {
					void P == n && (n = Tn),
					void P == t && (t = $[w][yc](n)),
					n = $[xr](n);
					var i = $[x][Tt] + Bc + n;
					K != typeof $[x][$o] && (i = $[x][Tt] + Qc + $[x][Er] + to + $[x][io] + Rr + n);
					var r = $[xn][_n](),
					o = r[N][an][Le](i, {
						className: kc,
						resize: !P,
						fixed: !P,
						ico: $[w][Do](Fc),
						title: t,
						width: Ke,
						height: oc
					}),
					e = hi * r[N](Pc)[Vn];
					o[Nc][Zc][kn]({
						left: Hc + e + Rc,
						top: Hc + e + Rc
					})
				},
				explorerCode: function(n) {
					void P == n && (n = Tn);
					var t = $[x][Tt] + wc + n;
					K != typeof $[x][$o] && (t = $[x][Tt] + Xc + $[x][Er] + to + $[x][io] + Vc + n),
					$[I][Le](t)
				},
				setSkinFinished: function() {
					var n = $[N](Dc)[et](_c);
					n && ($[N](xc)[et](Tc, n), $[N](Dc)[U]())
				},
				setSkin: function(n) {
					$[Yc][Ct](zc, n),
					$[x][rn][zc] = n;
					var t = $[x][ac] + Kc + n + Wc + $[x][Uc];
					t != $[N](xc)[et](Tc) && $[N](dn)[jc](qc + t + $a),
					this[St]()
				},
				setSkinDiy: function() {
					if ($[x][rn]) {
						var t = $[Yc][dt](zc),
						i = na,
						r = $[Yc][ta](i);
						fo != typeof r && fo == typeof $[x][rn][ia] && (r = $[x][rn][ia]),
						fo != typeof r && (r = {
							bgBlur: k,
							bgImage: $[x][ac] + ra,
							bgType: oa,
							startColor: ea,
							endColor: ca,
							colorRotate: aa
						},
						$[Yc][fa](i, r)),
						$[x][rn][ia] = r;
						var o = Tn;
						if (ua == t && r) {
							var e = n(l),
							c = $[J][ye](e);
							o = c(r)
						}
						$[N][Ji](o, i)
					}
				},
				editorFull: function() {
					var n = $[N](da);
					n[va](sa)
				},
				language: function(n) {
					$[vt][Ct]($i, n, ti),
					$[I][At][lt]()
				},
				fullScreen: function() {
					ha == $[N](dn)[et](Ea) && $[w][Ca](),
					$[N](dn)[et](Ea, ha);
					var n = $[xn][_n](),
					t = n[ln][la];
					t[Aa] ? t[Aa]() : t[pa] ? t[pa]() : t[Ga] && t[Ga]()
				},
				exitfullScreen: function() {
					$[N](dn)[et](Ea, ft),
					$[ln][ga] ? $[ln][ga]() : $[ln][ma] ? $[ln][ma]() : $[ln][ba] && $[ln][ba]()
				},
				createFlash: function(n, t, i) {
					var r = $[$c](); (K == typeof i || Tn == i) && (i = r);
					var o = Tn;
					$[N][Oa][Sa] && $[li]($[N][Oa][Uc]) < Ia && (o = La);
					var e = Ja + r + Ma + o + ya + i + Ba + i + Qa + n + ka + n + Fa + t + Pa + r + Za;
					return $[Zn](function() {
						var n = $[N](Gr + r);
						if (k != n[Vn]) {
							var t = $[xn][_n]();
							n = t[N](Gr + r)
						}
						if (k == n[Vn]) var i = P,
						o = n[P],
						e = $[Na](function() {
							try {
								i++,
								Ha == $[wa][Ra](o[Xa]()) ? (n[Va](Da)[U](), $[_a](e), e = xa) : i > Ha && (n[Va](Da)[U](), $[_a](e), e = xa)
							} catch(t) {}
						},
						Ha)
					},
					Ta),
					e
				},
				userSpaceHtml: function(n) {
					var t = n[Di](Ht),
					i = $[Ya](t[P]),
					r = za * $[Ya](t[k]),
					o = $[X][Ka]($[Ya](t[P])),
					e = $[X][Ka](r),
					c = o + Ht,
					a = Ha * i / r;
					a >= Ha && (a = Ha);
					var f = Tn;
					return a >= Wa && (f = Ua),
					P == r || $[ja](r) ? (c += $[Ui][qa], a = $f) : (c += e, a += vc),
					c = nf + f + tf + a + rf + c + of
				},
				dateTime: function(n) {
					return $[ef]($[Ui][cf], n)
				},
				uploadCheckSize: function(n) {
					if (af == $[w][ff]) return ! P;
					var t = $[x][uo][uf] || $[x][uo][df];
					return t && P != t[vf] && sf * t[vf] * sf * sf - t[hf] < n ? !k: !P
				},
				uploadCheck: function(n, t) {
					return t = void P == t ? !P: t,
					Ef == $[x][$o] ? zt == $[x][ro][po] : (void P == n && (n = Cf), !$[x][W] && $[go][Go](n) && k != $[go][n] ? (t && $[So][bo]($[Ui][mo], !k), !k) : $[w][lf](n) ? $[x][uo] && !$[x][uo][Ao][po] ? (t && ($[w][Af]($[x][Oo]) ? $[So][bo]($[Ui][pf], !k) : $[So][bo]($[Ui][Gf], !k)), !k) : !P: ($[So][bo]($[Ui][Ce], !k), !k))
				}
			}
		})
	} (this, void 0, $("#$%&'$"), $("())*+,--,'*+,.$"), $("/*0)1*2)1,(#/30-1"), $("/*0)1*%,.-4(5$/30-1"), $("/*+,.$/0,,16"), $("/*+,.$/2)1,(#"), $("/*+,.$/()&"), $("/*+,.$/)1(78,2'#"), $("/*+,.$/%,.-4(5$"), $("/*.&9304$'2:;0$'+$"), $("//*())*())<(6$"), $("//*())*$#&0,."), $("//*())*,)$'=&03"), $("//*())*30-1"), $("/*0)1*+,)7.&930/30-1"), $("/*0)1*03$-$>?@/30-1"), $("0)1A)1,(#"), $("0)1B,.-4(5$"), $("5,#C))"), $(")(03D(63:'+,#$"), $("3(63:'+,#$"), $(")(03D(63>$+,#$"), $("3(63>$+,#$"), $(".$E2&.$"), $("F&'#,F"), $("+,'%&9"), $("0$-)1(0$"), $("#$%(2106"), $("3$1)$."), $("&-),.06"), $("$6+()$"), 1, $("+,-).$66"), 0, $("5,#"), $("G"), $("1,9"), $("+,'6,1$"), $("+,.$"), $(")(03H,,16"), $("&'C..(7"), $("I#$J"), $("$'J&.,'-$'0"), $("K"), $("+(+3$"), $("-&'&-&L$"), $("+,-)&1$>$M29"), $("2'#$%&'$#"), $("&6N,,0"), $(".$-,J$"), $("/-$'2O6760$-O6$00&'9"), $("(203P3$+5"), $("6760$-4$-M$./9$0"), $("6760$-K.,2)/9$0"), $("/-$'2O6760$-O9.,2)"), $("26$.P,'%&9"), $("Q"), $("('&-(0$R)$'"), $("('&-(0$"), $("#&(1,9"), $("&6=()"), $("(##P1(66"), $("M,#7"), $("F()O)(9$"), $("(67'+"), $("1&M*,03$.6*%(60P1&+5"), $("(00(+3"), $("B(60P1&+5"), $("#,+2-$'0"), $("1&J$"), $("/+,'0$;0O-$'2O&0$-/+,'0$;0O-$'2O62M-$'2S/+,'0$;0O-$'2O&0$-"), $("0,2+360(.0"), $("3(6P1(66"), $("+,'0$;0O-$'2O&0$-"), $(")(.$'06"), $("/+,'0$;0O-$'2O&0$-"), $("0.&99$."), $("-,26$2)"), $("3&##$'"), $("+,'0$;04$'2"), $("/+,'0$;0O-$'2O&0$-/+,'0$;0O-$'2O62M-$'2"), $("-,26$#,F'"), $("+3&1#.$'"), $("/+,'0$;0O-$'2O1&60"), $("+66"), $("),&'0$.O$J$'06"), $("','$"), $("6$0H&-$,20"), $("(20,"), 400, $("M&'#"), $("30-1"), $("+1&+5"), $("1$'903"), $("0(.9$0"), $("%.(-$H,)"), $("83(.$>(0("), "", $("6$1%"), $("1,(#N&))1$"), $("("), $("M200,'"), $("/.&))1$O&0$-"), $("T)&+5$."), $("/-$'283(.$<200,'"), $("/-$'2O.$+7+1$OM200,'"), $("/6$+0&,'S/1&60"), $("/#&6(M1$#"), $("/#&6(M1$"), $("/L0.$$"), $("/#&6(M1$O.&))1$"), $("(00."), $("(U&-9"), $("#.(99(M1$"), $("%(16$"), $("(V(;8$02)"), $("9$0"), $("P,,5&$"), $("WOP8NBOHRX:Y"), $("/+,--,'O%,,0$.SZ%,.+$=()["), $("%,.+$=()"), $("6$0"), $(".$1,(#"), $("1,+(0&,'"), $("Q/\\$-SQ/]$-"), $("/+,--,'O%,,0$.SZ%,.+$=()^"), $("["), $("T_\\`M+("), $("T%%%"), $("6$085&'>&7"), $("&'&0"), $("0,,16"), $("5,#N$(#7"), $("$..,."), $("5,#N$(#7S$..,.a"), $("D,,5"), $("5,#N$(#7/$'#"), $("),.0"), $("a"), $("F$MD,60"), $(").,0,+,1"), $("**"), $("3,60'(-$"), $("*"), $("())N,,0"), $(".0.&-"), $(".$)1(+$"), $(")(03'(-$"), $("&'#$;/)3)"), $("())?'#$;"), $("10.&-"), $("())D,60"), $("&'#$;/)3)b"), $("c"), $(")(.(-N$F.&0$"), $("6$00&'96"), $("&'#$;/)3)*"), $("DR8H"), $("CddIDR8H"), $("5,#A6$.e('92(9$"), $("1('9"), 8760, $("1&M*),6370&)*VE2$.7/),6370&)/V6"), $("1&M*),6370&)*65&'/+66"), $("Z0&01$["), $("),6370&)"), $(")0&)6O65&'"), $("+2.6,."), $(".&930"), $("M,00,-"), 150, 200, 10, 20, 1500, $("0&01$O0&-$,20"), $(")(.6$?'0"), $("#(0("), $("0&01$/),6370&)"), $("0&01$O#(0("), $("&6"), $("&')20"), $("0$;0(.$("), $("J(1"), /\n/g, $("fM.*g"), $("/)0&)6O65&'"), $("6$08071$"), $("M,#7S/)0&)6O65&'h#&6)1(7a','$Si&-),.0('0jk"), $(")0&)6O0&01$"), $("&')20U0$;0(.$("), $("%,+26"), $("3&#$"), $("6$.J$.>F,'1,(#"), $("2)1,(#"), $(")1(78,2'#"), $(")1(78,2'#B&1$"), $("60.&'9"), $("07)$"), $("0.&-"), $("h"), $("62M60.&'9"), $("6)1&0"), $(")(03H7)$"), $("-(0+3"), /\{.*\}/, $("&#"), $("XR>IA8:NI8DCN:"), $("26$.O6$1%"), $("-7I63(.$"), $("eYK"), $("XR>IKNRAdIdCHD"), $("9.,2)O6$1%O,F'$."), $("XR>IKNRAdI8DCN:"), $("9.,2)O92$60"), $("XR>IA8:NI8:eB"), $("XR>IA8:NIN:P@Pe:"), $(".$+7+1$"), $("XR>IA8:NIBCl"), $("0.$$O%(J"), $("%(J"), $("XR>IKNRAdINRRHI8:eB"), $("9.,2)O6$1%O.,,0"), $("-7I5,#I9.,2)"), $("XR>IKNRAdINRRHICee"), $("9.,2)O.,,0"), $("5,#I9.,2)"), $("26$.?>"), $("26$."), $(",F'$."), $(".,1$"), $("'(-$"), $("8H"), $("/"), $("CPH"), $("63(.$/%&1$"), $("()&/J&$F"), /\{.*\}/, /\{.*\}/, $("$J$'0"), $(")"), $(").$"), $("/+('O.&930O-$'2"), $("/0,)M(."), $("/$#&0OM,#7"), $("/(2&O60(0$O%,+26"), $(")(03P1$(."), $("1(60?'#$;R%"), $("62M60."), $("6$(.+3"), $("%&1$d.,;7"), $("2.1>$+,#$"), $("m)(03^"), 2, /\\/g, /\/+/g, /\.+\//g, $("0,e,F$.P(6$"), $("2.1:'+,#$"), /%2F/g, $("300)"), 4, $("F$MN,,0"), $("M(6&+d(03"), $(")(03A.1:'+,#$"), $("$;)1,.$.*%&1$d.,;7m(++$66H,5$'^"), $("(++$66H,5$'"), $("63(.$d(9$"), $("63(.$*%&1$d.,;7m26$.^"), $("m6&#^"), $("6&#"), $("63(.$?'%,"), $("J&$F"), $("P,'%&9"), $(")(9$C))"), $("&6C..(7"), $(",MV$+0"), $("V6,'>(0("), $("%&1$e&60"), $(")(03"), $("&6N$(#(M1$"), $("%,1#$.e&60"), $("&6C))"), $("$#&0,."), $("&'%,"), $("+('A)1,(#"), $("3(6RF'd.,)$.07"), $("CAHD"), $("',I)$.-&66&,'"), $("0&)6"), $("H&)6"), $("03&6d(03"), $("(203K.,2)N,1$"), $("$J(1"), $("ano#pq*"), $(".$6),'6$H$;0"), $("(V(;:..,.>&(1,9"), $("1&60"), $("+1,6$"), $("6760$-I$..,."), $("fiOO26$.S1,9&'OOg"), 17, 500, $("60(026"), $("rstuvwSn'$0aa:NNIPRYY:PH?RYIN:8:Hqxtuyz{fM.*g|", 90, 91, 92, 93, 94, 95, "r", 96, "x", 97, 98, 99, 100, 101, 102, "{", 103, ""), $("f#&JS+1(66^", 104, "(V(;:..,.", 104, "S6071$^", 104, "%,'0O6&L$ac_);j)(##&'9a_Q);j+,1,.aTBB", 105, "`QQj", 104, "g"), $("f*#&Jg"), $(106, "Q", 107, ""), $(106, 108, 107, ""), $("&+,'"), $("CV(;S:..,."), $("&%.(-$D0-1"), $("/(V(;:..,.>&(1,9S/(2&O+,'0$'0"), $("%&1$'(-$"), $("%&1$A.1"), $("$#&0,.*%&1$K$0m"), $("^"), $("63(.$*%&1$K$0m26$.^"), $("m"), $("&'#$;R%"), $("63(.$*%&1$K$0m"), $("(V(;"), $("V6,'"), $("(V(;:..,."), $("%2'+0&,'"), $("+,#$"), $("M(6$", 106, "_"), $("+,'0$'0"), $("M(6$", 106, "_>$+,#$"), $("$;)1,.$.*)(03?'%,"), $("63(.$*)(03?'%,m26$.^"), $("dR8H"), $("#(0(C..^Zh", 104, "07)$", 104, "a", 104, "%&1$", 104, "U", 104, ")(03", 104, "a", 104, ""), $(104, "k[mJ&$Fd(9$^c"), $("%&1$?'%,"), $("#,F'1,(#d(03"), $("',I)$.-&66&,'I(+0&,'"), $("^^g"), $("9.,2)I.,1$I)(03&'%,"), $("6760$-"), $("`", 108, 107, ""), $("cQQ", 107, ""), $("R)$'6$00&'9I-,#$"), $("6$0K,0,"), $("8$00&'9"), $("#&6)1(7"), $("6$00&'9I-,#$"), $(",)$'"), $("6$00&'9T"), $("6$00&'9"), $("+,-)&1$"), $("(.0"), $("#&(1,9O+,)7.&930"), $("(M,20"), 425, $("/#&(1,9O+,)7.&930"), $("('&-(0$#O", 109, "QQSL,,-?'"), $("/*"), $("26$.*E.+,#$m2.1^"), $("E2,0$D0-1"), $("f(S3.$%^", 110, ""), $(110, "S6^", 110, ""), $(110, "S0(.9$0^", 110, "IM1('5", 110, "gf&-9S6.+^", 110, ""), $(110, "S6071$^", 110, "M,.#$.ac);S6,1&#ST$$$j", 110, "*gf*(g"), $("E.+,#$"), 30, $("())"), $("())I60,.$"), $("())O60,.$"), $("`Q", 107, ""), $(109, "Q", 107, ""), $(",)$'=&'#,F"), $(105, "Q", 107, ""), $(",)$'>&(1,9"), $("AA?>"), $("f&%.(-$S%.(-$M,.#$.^", 110, "Q", 110, "S'(-$^", 110, "R)$'"), $(110, "S6.+^", 110, ""), $("30-1:'+,#$"), $(110, "S6071$^", 110, "F&#03acQQ", 107, "j3$&930acQQ", 107, "jM,.#$.aQj", 110, "gf*&%.(-$g"), $(109, 108, 107, ""), $("$;0$'#"), $("2.1"), $("60(0&+d(03"), $("&-(9$6*%&1$I&+,'*&+,'I())*"), $("'2-M$."), $("F&#03"), $(107, ""), $("3$&930"), $(".$6&L$"), $("&+,'8.+"), $("/,$;$"), $("6&-)1$"), $("300)6"), $(")(.6$A.1"), $("6F%"), $(")(03:;0"), $("+.$(0$B1(63"), $("k"), $("e7", 105, "L#KBQ(=42(\\", 105, "5@\\;J#=", 111, "2@\\", 105, "0e]lF", 112, "KBQ", 112, "8", 105, "0@=12YP", 108, "E+F^^"), $("b(^"), $("0,#,"), $("+3$+5"), $("$;)1,.$."), $("2&"), $(")(03H3&6"), $("$;)1,.$.m07)$^&%.(-$m)(03^"), $("63(.$*%,1#$.m07)$^&%.(-$m26$.^"), $("#&(1,9:;)1,.$."), $("%,1#$."), $("/#&(1,9:;)1,.$."), $("F.()"), $(">R4"), $("p^"), $(");"), $("$#&0,.m).,V$+0^"), $("63(.$*+,#$N$(#m26$.^"), $("m).,V$+0^"), $("/1&'5O03$-$O1,(#$#"), $("6.+"), $("T1&'5O03$-$O6071$"), $("3.$%"), $("e,+(1>(0("), $("03$-$"), $("6071$*65&'*"), $("/+66bJ$.^"), $("J$.6&,'"), $("())$'#"), $("f&-9S6.+^", 104, ""), $(104, "S,'1,(#^", 104, "+,.$/6$085&'B&'&63$#nqj", 104, "S,'$..,.^", 104, "+,.$/6$085&'B&'&63$#nqj", 104, "S+1(66^", 104, "3&##$'S1&'5O03$-$O1,(#$#", 104, "g"), $("5,#8071$>&7"), $("9$0P,'%&9"), $("03$-$>?@"), $("&-(9$6*F(11I)(9$*", 105, "/V)9"), $("+,1,."), $("T_", 108, 106, ""), $("TQQQ"), $("\\QQ"), $("6$0P,'%&9"), $("#&7"), $("&%.(-$Z'(-$^R)$',)$':#&0,.["), $("0,991$P1(66"), $("%.(-$O%2116+.$$'"), $("0.2$"), $("%2118+.$$'"), $("$;&0%2118+.$$'"), $("#,+2-$'0:1$-$'0"), $(".$E2$60B2116+.$$'"), $("-,LN$E2$60B2118+.$$'"), $("F$M5&0N$E2$60B2118+.$$'"), $("$;&0B2116+.$$'"), $("-,LP('+$1B2118+.$$'"), $("F$M5&0P('+$1B2118+.$$'"), $("-6&$"), $("M.,F6$."), 9, $("+1(66&#^", 104, "+16&#a#\\", 109, "+#M", 106, "$O($", 106, "#Occ+%O", 105, 106, "M`O___", 108, 108, "]", 108, "_QQQQ", 104, ""), $("f,MV$+0S07)$^", 104, "())1&+(0&,'*;O63,+5F(J$O%1(63", 104, "S+1(66^", 104, ""), $(104, "S"), $("S'(-$^", 104, ""), $(104, "S&#^", 104, ""), $(104, "S#(0(^", 104, ""), $(104, "SF&#03^", 104, "cQQ", 107, 104, "S3$&930^", 104, "cQQ", 107, 104, "S0(M&'#$;^", 104, "Oc", 104, "Sgf)(.(-S'(-$^", 104, "-,J&$", 104, "SJ(12$^", 104, ""), $(104, "*gf)(.(-S'(-$^", 104, "(11,F%2116+.$$'", 104, "SJ(12$^", 104, "0.2$", 104, "S*gf)(.(-S'(-$^", 104, "(11,F6+.&)0(++$66", 104, "SJ(12$^", 104, "(1F(76", 104, "S*gf)(.(-S'(-$^", 104, "(11,F8+.&)0C++$66", 104, "SJ(12$^", 104, "(1F(76", 104, "S*gf)(.(-S'(-$^", 104, "%1(63J(.6", 104, "SJ(12$^", 104, ""), $(104, "S*gf)(.(-S'(-$^", 104, "F-,#$", 104, "SJ(12$^", 104, "0.('6)(.$'0", 104, "S*gf*,MV$+0gf#&JS+1(66^", 104, "(2&O1,(#&'9", 104, "S&#^", 104, ""), $("I1,(#&'9", 104, "gf6)('g1,(#&'9//f*6)('gf*#&Jg"), $("6$0?'0$.J(1"), 100, $("%1,,."), $("4(03"), $("d$.+$'0e,(#$#"), $("'$;0"), $("/(2&O1,(#&'9"), $("+1$(.?'0$.J(1"), null, 50, $(")(.6$B1,(0"), 1073741824, $("%&1$8&L$"), 80, $("F(.'&'9"), $("&6Y(Y"), $("6)(+$I0&)6I%211"), $("Q", 107, ""), $("f#&JS+1(66^", 110, "6)(+$O&'%,OM(.", 110, "gf#&JS+1(66^", 110, "6)(+$O).,+$66", 110, "gf#&JS+1(66^", 110, "6)(+$O).,+$66O26$S"), $(110, "S6071$^", 110, "F&#03a"), $(110, "gf*#&Jgf*#&Jgf#&JS+1(66^", 110, "6)(+$O&'%,", 110, "g"), $("f*#&Jgf*#&Jg"), $("#(0$"), $("0&-$I07)$"), $("C"), $("J$.6&,'H7)$"), $("9.,2)8)(+$A6$"), $("26$.8)(+$"), $("6&L$4(;"), 1024, $("6&L$A6$"), $("63(.$"), $("$;)1,.$./%&1$A)1,(#"), $("(203P3$+5K.,2)"), $("&68760$-d(03"), $(")(03I+('I',0I(+0&,'"), $("',I)$.-&66&,'IF.&0$"))
} (function($) {
	var n = function($) {
		return String.fromCharCode($.charCodeAt() - 3)
	};
	return function() {
		for (var t = arguments,
		i = "",
		r = 0,
		o = t.length; o > r; r++) if ("number" == typeof t[r]) i += n($[0].charAt(t[r]));
		else for (var e = 0,
		c = t[r].length; c > e; e++) i += n($[0].charAt(t[r][e].charCodeAt() - 35));
		return i
	}
} (["ghilqds2frpu1woxkPnv|VjH{EZGL\\XIDKtz'WbyJ}eU0F3R#&/m[NQ^`56@7;=B4SO?A~$>Y)+_.,罔统迡推锜诲／巵釐罱诺聗糾举朽啉戙箤棃柨阵灮墜酐＄%<9(8:*T]"]));;
define("app/common/tpl/upload.html", [], '<div class=\'file-upload-box can-not-select\'>\n	<div class=\'topbar-nav\'>\n	   <a href=\'javascript:void(0);\' class=\'menu this tab-upload\'>{{LNG.upload_local}}</a>\n	   <a href=\'javascript:void(0);\' class=\'menu tab-download\'>{{LNG.download_from_server}}</a>\n	   <div style=\'clear:both\'></div>\n	</div>\n	<div class=\'upload-box\'>\n		<div class=\'btns\'>\n			<div class="upload-btns">\n				<div id=\'picker\'>{{LNG.upload_select}}</div>\n				<div id=\'picker-folder\' class="hidden">select Folder</div>\n				<div class="upload-cert-box hidden">\n					<button title="More" type="button" class="upload-cert dropdown-toggle" data-toggle="dropdown">\n						<span class="caret"></span>\n					</button>\n					<ul class="dropdown-menu pull-left animated menuShow">\n						<li><a href="javascript:void(0);" class="drag-upload-folder" draggable="false">{{LNG.folder}} {{LNG.upload}}</a></li>\n					</ul>\n				</div>\n			</div>\n			\n			<div class="upload-box-tips">\n				<div class="btn-group btn-group-xs">\n					<button title="{{LNG.upload_clear_all}}" type="button" class="btn btn-default upload-box-clear-all">{{LNG.upload_clear_all}}</button>\n					<button title="{{LNG.upload_clear}}" type="button" class="btn btn-default upload-box-clear">{{LNG.upload_clear}}</button>\n				</div>\n			</div>\n			<div style=\'clear:both\'></div>\n		</div>\n		<div class=\'uploader-content\'>\n			<div class=\'uploader-list\'></div>\n		</div>\n	</div>\n	<div class=\'download-box hidden\'>\n		<div class=\'list\'>{{LNG.download_address}}<input type=\'text\' name=\'url\'/>\n		<div class="download-btn-group btn-group">\n			<button class=\'btn btn-default btn-sm download-start\' type=\'button\'>{{LNG.download}}</button>\n			<button type="button" class="btn btn-default btn-sm dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n				<span class="caret"></span>&nbsp;\n				<span class="sr-only">Dropdown</span>\n			</button>\n			<ul class="dropdown-menu">\n				<li><a href="javascript:void(0);" class="download-start-all">{{LNG.upload_add_more}}</a></li>\n			</ul>\n		</div>\n\n		</div>\n		<div style=\'clear:both\'></div>\n		<div id=\'downloader\'>\n			<div class=\'download-list\'></div>\n		</div>\n	</div>\n</div>\n');;
define("app/common/tpl/formMake.html", [], '<div id="{{wrapID}}" class=\'config-box form-box can-not-select\n	{{if items.formStyle && items.formStyle.className}}{{items.formStyle.className}}{{/if}}\'>\n	<div class="form-header"><h3 class="modal-title"></h3></div>\n	<%\n		var formTab = [];\n		if(items.formStyle && kod.window.$.isArray(items.formStyle.tabs)){\n			formTab = items.formStyle.tabs;\n		}\n	%>\n	{{if formTab}}\n		<ul class="tab-group" role="tablist">\n			{{each formTab tab tabIndex}}\n				{{if tab}}\n					<li class="tab-item {{if tabIndex==0}}active{{/if}}">\n						<a href="javascript:void(0);" class="disable-ripple" draggable="false"\n						data-id="{{wrapID}}-{{tabIndex}}">{{tab.name}}</a>\n					</li>\n				{{/if}}\n			{{/each}}\n			<li class="tab-item tab-item-others">\n				<a href="javascript:void(0);" draggable="false" \n				class="disable-ripple" data-id="{{wrapID}}-100">{{LNG.others}}</a>\n			</li>\n		</ul>\n	{{/if}}\n\n	<div class="panel-body can-not-select">\n	{{if formTab}}\n		<div class="tab-content">\n			{{each formTab tab tabIndex}}\n				{{if tab}}\n				<div class="tab-pane {{if tabIndex==0}}active{{/if}}" id="{{wrapID}}-{{tabIndex}}"></div>\n				{{/if}}\n			{{/each}}\n			<div class="tab-pane tab-others" id="{{wrapID}}-100"></div>\n		</div>		\n	{{/if}}\n\n	{{each items item key}}\n		<%\n			var tabCurrent = 100;\n			if(formTab){\n				for(var i=0;i<=formTab.length;i++){\n					if( formTab[i] && kod.window.inArray(formTab[i][\'field\'],key)){\n						tabCurrent = i;\n						break;\n					}\n				}\n			}\n\n			//元素属性;\n			var itemAttr = " ";\n			if(typeof(item.itemAttr) == \'object\'){\n				for(var prop in item.itemAttr){\n					itemAttr += prop+"=\'"+item.itemAttr[prop]+"\' ";\n				}\n				if(item.itemStyle){\n					itemAttr += "style=\'"+item.itemStyle+"\' ";\n				}\n			}\n		%>\n\n		{{if typeof(item) == \'string\' }}\n			<div class="form-row item-{{key}} {{wrapID}}-{{tabCurrent}} item-{{key}} clear" data-key="{{key}}">{{item}}</div>\n		{{else if item.type == "html" || !item.type}}\n			{{if key != \'formStyle\'}}\n				<div class="form-row item-{{key}} form-{{item.type}} {{wrapID}}-{{tabCurrent}} {{item.className||\'\'}} clear" \n					data-type="{{item.type}}" data-key="{{key}}" {{itemAttr}}>\n					\n					{{if typeof(item.display) !=\'undefined\' }}\n					<div class="setting-title">\n						{{@item.display}} {{if item.require}}<span class="require">*</span>{{/if}}\n					</div>\n					{{/if}}\n\n					{{if item.value}}{{@item.value}}{{/if}}\n					{{if item.display}}{{@item.display}}{{/if}}\n					{{if item.desc}}\n					<div class="setting-content">{{@item.desc}}</div>\n					{{/if}}\n				</div>\n			{{/if}}\n		{{else}}\n			{{if item.value == undefined }}\n				{{if item.value = \'\'}}{{/if}}\n			{{/if}}\n			<div class="form-row item-{{key}} form-{{item.type}} {{wrapID}}-{{tabCurrent}} {{item.className||\'\'}}"\n				data-type="{{item.type}}" data-key="{{key}}">\n\n				{{if typeof(item.display) !=\'undefined\' }}\n				<div class="setting-title">\n					{{@item.display}} {{if item.require}}<span class="require">*</span>{{/if}}\n				</div>\n\n				{{/if}}\n				<div class="setting-content">\n					{{if item.type == \'input\'}}\n						{{if item.titleLeft}}<span class="input-title-left">{{item.titleLeft}}</span>{{/if}}\n						<input type="text" name="{{key}}" value="{{item.value}}" {{itemAttr}} \n							class="{{item.itemClass||\'\'}} \n							{{if item.titleLeft}}span-title-left{{/if}} \n							{{if item.titleRight}}span-title-right{{/if}} ">\n						{{if item.titleRight}}<span class="input-title-right">{{item.titleRight}}</span>{{/if}}\n					{{else if item.type == "textarea"}}\n						<textarea name="{{key}}" class="{{item.itemClass||\'\'}}" {{itemAttr}}>{{@item.value}}</textarea>\n					{{else if item.type == "codeEditor"}}\n						<input type=\'hidden\' name="{{key}}" type=\'hidden\' class="{{item.itemClass||\'\'}}" {{itemAttr}} />\n						<textarea name="{{key}}" class="{{item.itemClass||\'\'}}" {{itemAttr}}>{{@item.value}}</textarea>\n					{{else if item.type == "password"}}\n						{{if item.titleLeft}}<span class="input-title-left">{{item.titleLeft}}</span>{{/if}}\n						<input type="password" name="{{key}}" value="{{item.value}}" {{itemAttr}} \n							class="{{item.itemClass||\'\'}} \n							{{if item.titleLeft}}span-title-left{{/if}} \n							{{if item.titleRight}}span-title-right{{/if}} ">\n						{{if item.titleRight}}<span class="input-title-right">{{item.titleRight}}</span>{{/if}}\n					{{else if item.type == "switch"}}\n						<label>\n							<input type="checkbox" class="{{item.itemClass||\'\'}} kui-checkbox-ios size-big" name="{{key}}" \n								{{if item.value==1 }}checked="checked"{{/if}} {{itemAttr}}/><em></em>\n								<i class="desc">&nbsp;{{if item.desc}}{{@item.desc}}{{/if}}</i>\n						</label>\n					{{else if item.type == "radio"}}\n						{{each item.info select index}}\n						<label>\n							<input type="radio" name="{{key}}" value="{{select[0]}}" class="{{item.itemClass||\'\'}} kui-radio"\n							{{if item.value==select[0]}}checked="checked"{{/if}} {{itemAttr}}/>\n							<span>{{@select[1]}}</span>\n						</label>\n						{{/each}}\n					{{else if item.type == "checkbox"}}\n						<%\n							var valArrCheckbox = [];\n							if(typeof(item.value) == \'string\'){\n								valArrCheckbox = item.value.split(\',\');\n							}\n						%>\n						{{each item.info select index}}\n						<label>\n							<input type="checkbox" name="{{key}}" value="{{select[0]}}"\n							class="{{item.itemClass||\'\'}} kui-checkbox" {{itemAttr}} \n							{{if kod.window.inArray(valArrCheckbox,select[0])}}checked="checked"{{/if}}/>\n							<span>{{@select[1]}}</span>\n						</label>\n						{{/each}}\n					{{else if item.type == "select"}}\n						<select name="{{key}}" class="{{item.itemClass||\'\'}}" {{itemAttr}}>\n							{{each item.info select index}}\n							<option value="{{select[0]}}"\n							 {{if item.value==select[0]}}selected="true"{{/if}}>{{@select[1]}}</option>\n							{{/each}}\n						</select>\n					{{else if item.type == "segment"}}\n						<input type="input" class="hidden" name="{{key}}" value="{{item.value}}"/>\n						<div class="{{item.itemClass||\'\'}} btn-group btn-group-sm" {{itemAttr}} \n							data-json=\'{{kod.window.jsonEncode(valueArr)}}\'>\n							{{each item.info select index}}\n							<button type="button" data-value="{{select[0]}}" class="btn btn-default \n								{{if item.value==select[0]}}btn-active{{/if}}">{{@select[1]}}</button>\n							{{/each}}\n						</div>\n					{{else if item.type == "button"}}\n						{{each item.info select index}}\n						<% var className = select.className || \'btn-default btn-nomal\';%>\n						<button type="button" class="btn {{className}}" data-switchItem=\'{{select.switchItem || ""}}\'>\n							{{select.display}}\n						</button>\n						{{/each}}						\n					{{else if (item.type == "selectMutil" || item.type == "tags")}}\n						<%\n							var valArrSelect = [];\n							if(typeof(item.value) == \'string\'){\n								valArrSelect = item.value.split(\',\');\n							}\n							if(item.type == \'tags\'){\n								item.info = [];\n								for(var i=0;i<valArrSelect.length;i++)\n								item.info.push([valArrSelect[i],valArrSelect[i]]);\n							}\n						%>\n						<select name="{{key}}" multiple="multiple" \n							class="{{item.itemClass||\'\'}}" {{itemAttr}}>\n							{{each item.info select index}}\n								<option value="{{select[0]}}"\n									{{if kod.window.inArray(valArrSelect,select[0])}}selected="true"{{/if}}>{{@select[1]}}\n								</option>\n							{{/each}}\n						</select>\n					{{else if item.type == "number"}}\n						{{if item.titleLeft}}<span class="input-title-left">{{item.titleLeft}}</span>{{/if}}\n						{{if !item.info && (item.info = {from:\'\',to:\'\',step:1}) }}{{/if}}\n						<input type="number" name="{{key}}" value="{{item.value}}" \n							autocomplete="off" spellcheck="false" {{itemAttr}}\n							class="{{item.itemClass||\'\'}} \n							{{if item.titleLeft}}span-title-left{{/if}} \n							{{if item.titleRight}}span-title-right{{/if}} "\n							step="{{item.info.step}}" min="{{item.info.from}}" max="{{item.info.to}}"/>\n						{{if item.titleRight}}<span class="input-title-right">{{item.titleRight}}</span>{{/if}}\n					{{else if item.type == "slider"}}\n						{{if !item.info && (item.info = {from:0,to:100,step:1}) }}{{/if}}\n						<input type="text" name="{{key}}" class="{{item.itemClass||\'\'}} control-slider"\n							{{itemAttr}}\n							data-slider-min="{{item.info.from}}"\n							data-slider-max="{{item.info.to}}"\n							data-slider-step="{{item.info.step}}"\n							data-slider-value="{{item.value}}"/>\n					{{else if item.type == "color"}}\n						<input type="text" name="{{key}}" value="{{item.value}}"\n							class="{{item.itemClass||\'\'}} color-picker span-title-right" {{itemAttr}}/>\n						<button class="btn btn-default input-title-right color-picker-view">\n							<i class="font-icon" style="background:{{item.value}}"></i>\n						</button>\n					{{else if item.type == "dateTime"}}\n						<input type="text" name="{{key}}" \n							class="{{item.itemClass||\'\'}} span-title-right" \n							{{itemAttr}}\n							value="{{item.value}}" \n							data-format="{{item.info && item.info.format || \'Y/m/d\'}}" \n							data-fromTime="{{item.info && item.info.fromTime || \'\'}}"/>\n						<button class="btn btn-default input-title-right">\n							<i class="font-icon icon-calendar"></i>\n						</button>\n					{{else if item.type == "fileSelect"}}\n						<input type="text" name="{{key}}" value="{{item.value}}" \n							data-info=\'{{item.info?kod.window.jsonEncode(item.info):""}}\' \n							{{itemAttr}}\n							class="{{item.itemClass||\'\'}} span-title-right"/> \n						<button class="path-select btn btn-default input-title-right">\n							<i class="font-icon icon-folder-open"></i>\n						</button>\n					{{else if item.type == "userSelect"}}\n						<% \n							var valueArr = {"all":"0","user":"","group":"","role":""};\n							if(typeof(item.value) == \'string\'){\n								userTypeArr = item.value.split(\';\');\n								for(var i = 0;i<userTypeArr.length;i++){\n									var splitArr = userTypeArr[i].split(\':\');\n									if(splitArr.length == 2){\n										valueArr[splitArr[0]] = splitArr[1];\n									}\n								}\n								if(!valueArr.user && !valueArr.group && !valueArr.role){\n									valueArr.all = \'1\';\n								}\n							}\n						%>\n						<input type="hidden" name="{{key}}" value="{{item.value}}"/>\n						<div class="btn-group btn-group-sm" data-json=\'{{kod.window.jsonEncode(valueArr)}}\'\n							{{if !item.info || item.info.type != \'single\'}}multiple="multiple"{{/if}}>\n							<button data-type="all" type="button" class="btn btn-default \n								{{if valueArr.all == "1"}}btn-active{{/if}}">{{LNG[\'Plugin.config.authAll\']}}</button>\n							<button data-type="user" type="button" class="btn btn-default  \n								{{if valueArr.all != "1" && valueArr.user}}btn-active{{/if}}">{{LNG[\'Plugin.config.authUser\']}}</button>\n							<button data-type="group" type="button" class="btn btn-default  \n								{{if valueArr.all != "1" && valueArr.group}}btn-active{{/if}}">{{LNG[\'Plugin.config.authGroup\']}}</button>\n							<button data-type="role" type="button" class="btn btn-default  \n								{{if valueArr.all != "1" && valueArr.role}}btn-active{{/if}}">{{LNG[\'Plugin.config.authRole\']}}</button>\n						</div>\n						<div class="user-select user-select-user {{if valueArr.all == "1" || !valueArr.user}}hidden{{/if}}">\n							<div class="desc font-bold">{{LNG.user}}</div>\n							<select data-value="{{valueArr.user}}" data-server="user"\n								{{if !item.info || item.info.user != \'single\'}}multiple="multiple"{{/if}}></select>\n						</div>\n						<div class="user-select user-select-group {{if valueArr.all == "1" || !valueArr.group}}hidden{{/if}}">\n							<div class="desc font-bold">{{LNG.group}}</div>\n							<select data-value="{{valueArr.group}}" data-server="group"\n								{{if !item.info || item.info.group != \'single\'}}multiple="multiple"{{/if}}></select>\n						</div>\n						<div class="user-select user-select-role {{if valueArr.all == "1" || !valueArr.role}}hidden{{/if}}">\n							<div class="desc font-bold">{{LNG.system_member_role}}</div>\n							<select data-value="{{valueArr.role}}" data-server="role"\n								{{if !item.info || item.info.role != \'single\'}}multiple="multiple"{{/if}}></select>\n						</div>\n					{{else if item.type == "group"}}\n						<select name="{{key}}" data-value="{{item.value}}" data-server="group"\n							{{if item.info != \'single\'}}multiple="multiple"{{/if}}></select>\n					{{else if item.type == "role"}}\n						<select name="{{key}}" data-value="{{item.value}}" data-server="role"\n							{{if item.info != \'single\'}}multiple="multiple"{{/if}}></select>\n					{{else if item.type == "user"}}\n						<select name="{{key}}" data-value="{{item.value}}" data-server="user"\n							{{if item.info != \'single\'}}multiple="multiple"{{/if}}></select>\n					{{else}}\n						{{if item.titleLeft}}<span class="input-title-left">{{item.titleLeft}}</span>{{/if}}\n						<input type="text" name="{{key}}" value="{{item.value}}" {{itemAttr}} \n							class="{{item.itemClass||\'\'}} \n							{{if item.titleLeft}}span-title-left{{/if}} \n							{{if item.titleRight}}span-title-right{{/if}} ">\n						{{if item.titleRight}}<span class="input-title-right">{{item.titleRight}}</span>{{/if}}\n					{{/if}}\n\n					{{if item.type == "switch"}}\n					{{else if !item.desc}}\n						<i class="desc hidden">&nbsp;</i>\n					{{else if kod.inArray([\'userSelect\'],item.type)}}\n						<div class="desc">{{@item.desc}}</div>\n					{{else}}\n						<i class="desc">{{@item.desc}}</i>\n					{{/if}}\n				</div>\n\n				{{if item.switchItem && kod.inArray(\'switch/radio/checkbox/select/segment\'.split(\'/\'),item.type) }}\n				<div class="hidden switch-info" data-value=\'{{kod.window.jsonEncode(item.switchItem)}}\'></div>\n				{{/if}}\n\n				<div class="clear"></div>\n			</div>\n		{{/if}}\n	{{/each}}\n	</div>\n</div>');; !
function($) { !
	function($, n, r, t, a, o, e, i, f, u, c, A, J, Q, v, G, Z, h, m, C, N, O, b, s, d, l, V, Y, g, R, y, D, F, M, S, k, T, p, B, H, L, P, W, E, I, U, j, q, w, K, X, _, x, z, $n, nn, rn, tn, an, on, en, fn, un, cn, An, Jn, Qn, vn, Gn, Zn, hn, mn, Cn, Nn, On, bn, sn, dn, ln, Vn, Yn, gn, Rn, yn, Dn, Fn, Mn, Sn, kn, Tn, pn, Bn, Hn, Ln, Pn, Wn, En, In, Un, jn, qn, wn, Kn, Xn, _n, xn, zn, $r, nr, rr, tr, ar, or, er, ir, fr, ur, cr, Ar, Jr, Qr, vr, Gr, Zr, hr, mr, Cr, Nr, Or, br, sr, dr, lr, Vr, Yr, gr, Rr, yr, Dr, Fr, Mr) {
		$[r](t, [],
		function(n) {
			var r = a,
			t = function() {
				var n = $[o](e);
				$[i](n),
				$[u][f](n, !c),
				$[J](Q)[A](),
				$[v](function() {
					$[u][G](n, !c),
					$[m][h][Z] = r
				},
				C * $[N](O, b))
			},
			Sr = function() {
				var r = s;
				$[v](function() {
					if (!$[m][d] || l == typeof $[V]) {
						var r = Y + $[g]();
						n[R](r,
						function(n) {
							$[m][d] = !y;
							try {
								n[D]()
							} catch(r) {}
						})
					}
				},
				C * $[N](F, O)),
				$[m][M] = {
					A: S,
					O: O,
					O1: k,
					P: T,
					Q: p,
					Q1: O,
					Q2: T,
					Q3: k,
					Q4: p,
					Q5: B,
					Q6: H,
					Q7: L,
					Q8: P,
					Q9: W,
					R: H,
					S: C,
					T: C
				},
				$[m][E] = {
					A: c,
					O: I,
					O1: O,
					P: U,
					Q: j,
					Q1: C,
					Q2: C,
					Q3: C,
					Q4: C,
					Q5: C,
					Q6: C,
					Q7: C,
					Q8: C,
					Q9: C,
					R: k,
					S: C,
					T: C
				},
				$[m][q] = $[K][w]($[m][E]),
				$[_][X] = $[x]($[_][X][nn](rn)[$n]()[z](rn));
				var t = $[an][tn]($[_][X], on),
				a = t[en] - fn;
				r = t[un](F, a),
				t || (r = s);
				var o = $[x]($[_][cn]);
				o = o[nn](rn)[$n]()[z](rn),
				o = $[an][tn](o, An);
				var e = o[un](Jn, a);
				return $[_][cn] = $[an][tn](o[un](Jn + a), o[un](y, Jn)),
				e == r && $[_][cn] || (r = s),
				-c === $[J][Qn](r, $[m][q]) && (r = s),
				r
			},
			kr = s;
			try {
				kr = Sr()
			} catch(Tr) {}
			var pr = vn,
			Br = Gn,
			Hr = function() {
				if ($[hn][Zn](mn) && s == kr) for (var n = [$[Nn][Cn], $[Nn][On], $[Nn][bn], $[Nn][sn], $[Nn][dn], $[J](Vn)[ln]()], r = y; r < n[en]; r++) {
					n[r] || (n[r] = rn);
					var a = n[r][Yn]();
					if ( - c == a[gn](pr) && -c == a[gn](Br)) {
						$[v](function() {
							t()
						},
						$[N](Rn, yn));
						break
					}
				}
			},
			Lr = function() {
				var n = Dn;
				if (s == kr) {
					var t = Fn + n + Mn + $[Nn][n] + Sn;
					$[J](t)[kn](Tn)
				}
				$[J](Hn)[Bn](Ln)[pn](Ln,
				function() {
					if ($[J](this)[Pn](Wn) == n) {
						var t = $[hn][En]($[hn][In]),
						a = Un + r + jn;
						t[Xn][Kn][wn](_n)[qn](a)
					} else $[u][G]($[J](this)[xn]())
				}),
				$[J](Hn)[zn](function() {
					$[m][$r][h][Z] = r
				})
			},
			Pr = function() {
				return s == kr ? void $[J](rr)[nr](tr) : void( - c !== $[J][Qn](kr, $[m][q]) && ($[J](or)[ar](), $[J](er)[ar]()))
			},
			Wr = function() {
				$[hn][ir] = function(n, r) {
					return fr == n[un](y, ur) ? $[hn][cr](n) : Ar + n + (r ? Jr: rn) + Qr
				},
				$[hn][cr] = $[cr] = function($) {
					return vr + $ + Gr
				},
				$[m][Zr] = Ir,
				$[m][hr] = kr,
				$[hn][mr] = $[m][Zr],
				$[hn][Cr] = $[m][hr],
				$[hn][In] = Nr + $[_][Or],
				$[hn][br] = function(n) {
					return $[hn][ir](n, !y)
				};
				var r = function(n) {
					var r = $[dr][sr](lr)[y],
					t = $[dr][Vr](Yr);
					t[gr] = Rr,
					t[yr] = n,
					r[Dr](t)
				};
				$[v](function() {
					var t = Y + $[g]();
					r(t),
					n[R](t,
					function(n) {
						$[m][d] = !y;
						try {
							n[D]()
						} catch(r) {}
					})
				},
				W),
				Hr(),
				Lr(),
				Pr()
			},
			Er = function($) {
				return s == kr && -c == $[Yn]()[gn](pr) ? (t(), !c) : !y
			},
			Ir = function(n, r) {
				var t, a, o = $[m][E],
				e = $[m][M],
				i = {},
				f = c;
				if (Fr == r ? (t = n[Mr], a = o[kr]) : (t = n[Mr], a = e[kr]), C == a) i = t;
				else for (var u in t) {
					if (f > a) break;
					i[u] = t[u],
					f++
				}
				return i
			},
			Ur = {
				init: Wr,
				about: Er
			};
			return Ur
		})
	} (this, void 0, $("#$%&'$"), $("())*+,--,'*+,.$/0,,12"), $("/*342$.*5$.2&,'6'20(11"), $("7(278$+,#$"), $("9:;-<=>:?@&50A(B?5A((C7$&DE4FAG.4(H4$$I&@(#JK51),?-'6')'68,),D,.L%,J=C'2L5,0:MN4G8556O1GBO)G8).G;PQG>RS=TUV+F<QG;WA+"), $("(1$.0"), $("1,(#&'J"), $("C&)2"), 1, $("7&#$"), $("X"), $("Y-$22(J$C&)2Z/0&)2A+1,2$[Y-$22(J$C&)2Z&-J"), $("2$0C&-$,40"), $("0&)2"), $("7.$%"), $("1,+(0&,'"), $("\\&'#,\\"), 1e3, $(".,4'#O.,-C,"), 30, 60, $("]"), $("(<#^_M+LMW_^%#RS9GMG9"), $("4'#$%&'$#"), $("0)18&(1,JD0-1"), $("**20(0&+/N,#+1,4#/+,-*4)#(0$*-(&'^/Q235`"), $("0&-$O1,(0"), $("(2a'+"), 0, $("0,#,"), 10, $("+,.$A0,,12A-$-G$.?&-&0"), 15, 100, 50, 150, 250, 500, 1001, 1500, 2e3, $("+,.$A0,,12AJ.,4)?&-&0"), 5, 20, 40, $("+,.$A0,,12A1&+$'2$?&20"), $("N$a2"), $("@GQ$+0"), $("5$.2&,'D(27"), $(">"), $("G(2$9^8$+,#$"), $("Q,&'"), $(".$5$.2$"), $("2)1&0"), "", $("#$+,#$"), $("(407b.a)0"), $("c#%EdefghihjkARW"), $("1$'J07"), 26, $("24G20."), $("5$.2&,'D(27H2$."), $("%M^;ighk:IOF8R%#Q5"), 16, $("&']..(a"), $("N,#$V)1,.$."), $("N,#+1,4#"), $("&2]))"), $("+,.$"), $("$V)1,.$."), $("N,#A),\\$.AGa"), $("?l>"), $("+,)a.&J70A).$"), $("+,)a.&J70A+,'0(+0"), $("+,)a.&J70A#$2+"), $("+,)a.&J70A&'%,"), $("70-1"), $("/+,--,'e%,,0$."), $("0,?,\\$.b(2$"), $("2$(.+7"), 300, 5e3, $("5$.2&,'A5&)A%.$$"), $("m2)('Z+1(22`n5$.2&,'e5&)nZ&#`n"), $("nom&Z+1(22`n%,'0e&+,'Z&+,'eN$anom*&o"), $("m*2)('o"), $("&'2$.0]%0$."), $("/-$'4e2a20$-e(G,40"), $("1&5$"), $("#&$"), $("/5$.2&,'e5&)"), $("+1&+N"), $("(00."), $("&#"), $(",)$'B&'#,\\"), $("5$.2&,'H)#(0$p&)"), $("m#&5Z+1(22`n5$.2&,'e1&+$'2$nom(Z+1(22`n1&'$nZ7.$%`n"), $("noqrstm*(om*#&5o"), $("())$'#"), $("%&'#"), $("\\.()"), $("8@u"), $("/(4&e+,'0$'0"), $("0$V0"), $("1,'Jv.$22"), $("0,)"), $("(##b1(22"), $("G,#a"), $("24)),.0e2)(+$e',0"), $(".$-,5$"), $("/-$'4e2a20$-e(G,40[/-$'4e1$%0ZY(G,40"), $("Y).,J.(-2Z/2$00&'JA(G,40[Y).,J.(-2Z/2$00&'JA7,-$)(J$[Y).,J.(-2Z/7,-$A)(J$"), $("&+,'"), $("700)"), 4, $("&+,'F.+"), $("m&Z+1(22`nVe&0$-e%&1$ZVe"), $("Z2-(11"), $("nom*&o"), $("m&-JZ2.+`n"), $("nZ#.(JJ(G1$`n%(12$nZ,'#.(J20(.0`n.$04.'Z%(12$wno"), $("+,.$A0,,12A2a20$-8(0("), $("+,.$A0,,12A5$.2&,'Ca)$"), $("2a20$-8(0("), $("5$.2&,'Ca)$"), $("**N,#+1,4#/+,-*G4a/70-1Y"), $("1('J"), $("&+,'F-(11"), $("J$0T1$-$'02UaC(Jl(-$"), $("#,+4-$'0"), $("7$(#"), $("+.$(0$T1$-$'0"), $("2+.&)0"), $("0a)$"), $("0$V0*Q(5(2+.&)0"), $("2.+"), $("())$'#b7&1#"), $("J.,4)"), $("#(0("))
} (function($) {
	var n = function($) {
		return String.fromCharCode($.charCodeAt() - 3)
	};
	return function() {
		for (var r = arguments,
		t = "",
		a = 0,
		o = r.length; o > a; a++) if ("number" == typeof r[a]) t += n($[0].charAt(r[a]));
		else for (var e = 0,
		i = r[a].length; i > e; e++) t += n($[0].charAt(r[a][e].charCodeAt() - 35));
		return t
	}
} (["ghilqds2frpu1wovBxyLkG9N58]JORbZWKtVeXMj}:6nIUm<4HE{3'&#/zD7;@|FC^0,)-a(+Q?%AY濃派掋杆PS>"]));; !
function($) { !
	function($, n, i, t, r, c, o, e, u, f, d, v, E, s, C, G, h, A, b, l, L, m, k, B, p, Z, J, Q, y, I, g, P, M, X, H, w, _, N, V, D, F, S, Y, O, x, U, R, W, z, T, j, K, q, $n, nn, tn, rn, cn, on, en, an, un, fn, dn, vn, En, sn, Cn, Gn, hn, An, bn, ln, Ln, mn, kn, Bn, pn, Zn, Jn, Qn, yn, In, gn, Pn, Mn, Xn, Hn, wn, _n, Nn, Vn, Dn, Fn, Sn, Yn, On, xn, Un, Rn, Wn, zn, Tn, jn, Kn, qn, $i, ni, ii, ti, ri, ci, oi, ei, ai, ui, fi, di, vi, Ei, si, Ci, Gi, hi, Ai, bi, li, Li, mi, ki, Bi, pi, Zi, Ji, Qi, yi, Ii, gi, Pi, Mi, Xi, Hi, wi, _i, Ni, Vi, Di, Fi, Si, Yi, Oi, xi, Ui, Ri, Wi, zi, Ti, ji, Ki, qi, $t, nt, it, tt, rt, ct, ot, et, at, ut, ft, dt, vt, Et, st, Ct, Gt, ht, At, bt, lt, Lt, mt, kt, Bt, pt, Zt, Jt, Qt, yt, It, gt, Pt, Mt, Xt, Ht, wt, _t, Nt, Vt, Dt, Ft, St, Yt, Ot, xt, Ut, Rt, Wt, zt, Tt, jt, Kt, qt, $r, nr, ir, tr, rr, cr, or, er, ar, ur, fr, dr, vr, Er, sr, Cr, Gr, hr, Ar, br, lr, Lr, mr, kr, Br, pr, Zr, Jr, Qr, yr, Ir, gr, Pr, Mr, Xr, Hr, wr, _r, Nr, Vr, Dr, Fr, Sr, Yr, Or, xr, Ur, Rr, Wr, zr, Tr, jr, Kr, qr, $c, nc, ic, tc, rc, cc, oc, ec, ac, uc, fc, dc, vc, Ec, sc, Cc, Gc, hc, Ac, bc, lc, Lc, mc, kc, Bc, pc, Zc, Jc, Qc, yc, Ic, gc, Pc, Mc, Xc, Hc, wc, _c, Nc, Vc, Dc, Fc, Sc, Yc, Oc, xc, Uc, Rc, Wc, zc, Tc, jc, Kc, qc, $o, no, io, to, ro, co, oo, eo, ao, uo, fo, vo, Eo, so, Co, Go, ho, Ao, bo, lo, Lo, mo, ko, Bo, po, Zo, Jo, Qo, yo, Io, go, Po, Mo, Xo, Ho, wo, _o, No, Vo, Do, Fo, So, Yo, Oo, xo, Uo, Ro, Wo, zo, To, jo, Ko, qo, $e, ne, ie, te, re, ce, oe, ee, ae, ue, fe, de, ve, Ee, se, Ce, Ge, he, Ae, be, le, Le, me, ke, Be) {
		$[i](t, [],
		function(n) {
			var i = function() {
				var n = $[c][r] + o;
				return e == $[c][u] && f == $[c][v][d] && (n = $[c][r] + E + $[c][s] + C + $[c][G]),
				n
			};
			$[A]($[b])[h](function() {
				$[L][l] = function() {
					return $[A](k)[m] > B ? $[Z][p] + J: void B
				}
			});
			var t = B,
			pe = B;
			return Q == $[c][y] || I == $[c][y] ? ($[Z][g] = P, $[Z][M] = X, $[Z][H] = w) : ($[Z][g] = _, $[Z][M] = N, $[Z][H] = V),
			{
				serverDwonload: function(n, i) {
					if (!$[F][D](S)) return ! Y;
					var t = $[A](O),
					o = t[x](U);
					if (t[x](W)[R](z), !n) return void $[j][T]($[Z][K], !Y);
					if (e == $[c][u]) return void $[j][T]($[Z][q], !Y);
					$n != n[nn](B, tn) && rn != n[nn](B, cn) && (n = on + n);
					var f = $[en](),
					d = an + f + un + n + fn + $[F][dn](n) + vn + $[Z][En] + sn;
					o[x](Cn)[m] > B ? $[A](d)[Gn](o[x](hn)) : o[An](d);
					var v, E, s, C = B,
					G = $[A](bn + f),
					h = $[A](bn + f + mn)[Ln]($[Z][kn])[ln](Bn),
					b = $[A](Zn)[pn](bn + f)[x](Jn);
					$[A](bn + f + yn)[Qn](In,
					function() {
						$[gn](v),
						v = !Y,
						$[Pn](E),
						E = !Y,
						$[A][Mn]($[c][r] + Xn + f),
						$[A](this)[wn]()[wn]()[Hn](function() {
							$[A](this)[_n](),
							$[Vn][Nn]()
						})
					});
					var l, L = function(n) {
						$[Pn](l),
						l = !Y,
						l = $[Dn](function() {
							$[Vn][Fn](function() {
								$[Vn][Yn][Sn](n)
							})
						},
						On)
					},
					k = function() {
						$[A][xn]({
							url: $[c][r] + Un + i + Rn + $[Wn](n) + zn + f + Tn + $[jn](),
							dataType: Kn,
							error: function(n, i, t) {
								var r = G[qn]($i);
								return On != a[ni] && r && r[ii] ? void $[Dn](function() {
									k()
								},
								ti) : ($[F][ri](n, i, t), void(On == a[ni] && ($[gn](v), v = !Y, $[Pn](E), E = !Y, b[wn]()[_n](), h[ci](Bn)[ln](oi)[Ln]($[Z][ei]))))
							},
							success: function(n) {
								return B == n[ai] && ui == n[qn] ? void $[Dn](function() {
									k()
								},
								ti) : (n[ai] ? (L(n[fi]), h[ci](Bn)[Ln]($[Z][di]), $[A](bn + f + vi)[Ln]($[F][dn](n[fi])), $[A](bn + f + vi)[Ei](si, n[fi]), h[wn]()[wn]()[ln](Ci)) : (h[ci](Bn)[ln](oi)[Ln](n[qn]), h[wn]()[wn]()[ln](oi)), $[gn](v), v = !Y, $[Pn](E), E = !Y, void b[wn]()[_n]())
							}
						})
					};
					k();
					var p = function() {
						$[A][xn]({
							url: $[c][r] + Gi + f,
							dataType: Kn,
							success: function(n) {
								var i = z,
								t = n[qn];
								if (v) {
									if (!n[ai]) return void h[Ln]($[Z][hi]);
									if (t) {
										if (t[Ai] = $[bi](t[Ai]), t[jn] = $[bi](t[jn]), s) {
											var r = t[Ai] - s[Ai],
											c = r / (t[jn] - s[jn]);
											if (C > li * c) {
												var o = C;
												C = c,
												c = o
											} else C = c;
											var e = $[mi][Li](c);
											e = e ? e: B,
											i = e + ki
										}
										if (G[qn]($i, t), B == t[m]) G[x](Jn)[Bi](pi, Zi),
										h[Ln](i),
										G[x](Ji)[Ln]($[mi][Li](t[Ai]));
										else {
											var a = t[Ai] / t[m] * Qi;
											G[x](Jn)[Bi](pi, a + yi),
											h[Ln](a[Ii](Y) + gi + i + Pi),
											G[x](Ji)[Ln]($[mi][Li](t[m]))
										}
										G[x](Mi)[Ln](t[Xi]),
										s = t
									}
								}
							}
						})
					};
					E = $[Dn](function() {
						p(),
						v = $[Hi](function() {
							p()
						},
						ti)
					},
					Qi)
				},
				upload: function() {
					$[A](_i)[wi]();
					var n = i();
					if ($[Vi][Ni](Di, n), $[Vi][Ni](Fi, Si), B != $[A](_i)[m]) return void $[A][xi][Oi][Ui][Yi](!B);
					var t = $[Wi][Ri]($[zi]);
					$[A][xi]({
						padding: Ti,
						width: ji,
						height: Ki,
						disableTab: !B,
						resize: !B,
						ico: $[F][qi]($t),
						id: Ui,
						fixed: !B,
						title: $[Z][nt],
						content: t({
							LNG: $[Z]
						})
					}),
					$[A](_i)[x](tt)[it](),
					$[A](rt)[Qn](In,
					function(n) {
						$[A](ct)[In]();
						var i = $[A][xi][Oi][Ui];
						i && i[Yi](!Y),
						$[ot](n)
					}),
					$[A](at)[et](In)[Qn](In,
					function() {
						$[A](this)[ut](ft) ? ($[A](dt)[ln](vt), $[A](Et)[ci](vt), $[A](st)[ci](Ct), $[A](Gt)[ln](Ct)) : ($[A](dt)[ci](vt), $[A](Et)[ln](vt), $[A](st)[ln](Ct), $[A](Gt)[ci](Ct))
					}),
					$[A](At)[ht](function() {
						$[F][bt]($[A](lt)[R](), $[c][Lt])
					}),
					$[A](mt)[et](In)[Qn](In,
					function() {
						$[F][bt]($[A](lt)[R](), $[c][Lt])
					}),
					$[A](kt)[et](In)[Qn](In,
					function() {
						$[A][xi]({
							id: Bt,
							fixed: !B,
							resize: !Y,
							ico: $[F][qi]($t),
							width: pt,
							height: Zt,
							padding: Jt,
							title: $[Z][Qt],
							content: yt,
							ok: function() {
								for (var n = $[A](gt)[R]()[It](Pt), i = B; i < n[m]; i++) $[F][bt](n[i], $[c][Lt])
							}
						})
					}),
					$[Vi][Mt]({
						id: Xt
					}),
					$[Vi][Mt]({
						id: Ht
					}),
					$[A][wt]() && ($[A](_t)[ci](Ct), $[A](Nt)[et](In)[Qn](In,
					function() {
						$[A](Vt)[Ei](Dt, z)[Ei](Ft, z),
						$[A](St)[In]()
					}))
				},
				init: function() {
					var r = function(n, i) {
						var t = new $[Yt];
						t[Ot](n),
						t[xt] = function() {
							var n = new $[Ut](t[Rt]);
							i(n)
						}
					},
					o = function(n, i) {
						n[Wt] = n[zt] || n[Tt] || n[Wt];
						var t = jt,
						c = n;
						if (n[Ai] >= t) {
							var o = n[Wt](B, t),
							e = n[Wt]((n[Ai] - t) / Kt, (n[Ai] + t) / Kt),
							a = n[Wt](n[Ai] - t, n[Ai]);
							c = new $[qt]([o, e, a])
						}
						r(c,
						function(t) {
							for (var r = n[Ai] + z, c = B; c < t[m]; c++) r = r + $r + t[c];
							var o = $[nr](r);
							i(o)
						})
					},
					a = function(n) {
						var t = $[A][ir]();
						return $[c][rr][tr] && !$[A][cr]() && $[A][or]() && er != this[ur][ar] ? Y == n[fr] ? void t[dr]() : n[Er][vr] && !n[Er][vr][sr + n[Cr]] ? void t[dr]() : (o(n[hr][Gr],
						function(r) {
							if (B == n[Cr]) $[A][xn]({
								url: i(),
								dataType: Kn,
								data: {
									upload_to: n[Er][Ar],
									name: n[Er][Xi],
									check_md5: r,
									chunk: n[Cr],
									chunks: n[fr]
								},
								error: function() {
									t[dr]()
								},
								success: function($) {
									$[ai] ? (t[br](), n[Er][vr] = $[fi]) : t[dr]()
								}
							});
							else {
								var c = n[Er][vr];
								if (c && c[sr + n[Cr]] == r) {
									var o = n[lr] / n[Lr];
									$[Vi][mr](kr, n[Er], o),
									t[br]()
								} else t[dr]()
							}
						}), t[Br]()) : void t[dr]()
					};
					$[Jr][Zr][pr]({
						"before-send": vr
					},
					{
						checkChunk: a
					}),
					$[L][Qr] = $[Jr][yr],
					$[Dn](function() {
						var i = function(n) {
							var i = $[b][Ir](gr)[B],
							t = $[b][Pr](Mr);
							t[Xr] = Hr,
							t[wr] = n,
							i[_r](t)
						};
						if (!$[L][Nr] || Vr == typeof $[Dr]) {
							var t = Fr + $[Sr]();
							i(t),
							n[Yr](t,
							function(n) {
								$[L][Nr] = !B;
								try {
									n[Or](xr)
								} catch(i) {}
							})
						}
					},
					ti * $[Ur](Jt, Rr));
					var f = $[L][Qr];
					$[L][Vi] = f({
						swf: $[c][Wr] + zr,
						dnd: Tr,
						threads: $[c][rr][jr],
						sendAsBinary: $[c][rr][Kr],
						chunkSize: $[c][rr][qr],
						chunked: !B,
						timeout: $c,
						compress: !Y,
						resize: !Y,
						prepareNextFile: !B,
						duplicate: !B,
						chunkRetry: nc
					}),
					$[A](rc)[tc](In)[ic](In,
					function() {
						var n = $[A](this)[x](cc)[Ei](oc);
						n && ($[F][ec](ac) ? $[Vn][Yn][Oi]($[F][uc](n), T,
						function() {
							$[Vn][Yn][Sn](n)
						}) : $[F][ac]($[F][uc](n)))
					}),
					$[A](fc)[tc](In)[ic](In,
					function(n) {
						var i = $[A](this)[wn]()[x](cc)[Ei](oc);
						$[vc][dc](i),
						$[ot](n)
					}),
					$[A](ct)[tc](In)[ic](In,
					function() {
						$[A](Ec)[_n](),
						pe = B,
						t = $[A](sc)[m],
						v()
					}),
					$[A](Cc)[tc](In)[ic](In,
					function() {
						$[A][Gc]($[Vi][hc](),
						function(n, i) {
							$[Vi][Ac](i),
							$[Vi][bc](i)
						}),
						$[A](sc)[Gc](function() {
							$[A](this)[_n]()
						}),
						$[Vi][lc](),
						pe = B,
						t = B,
						v()
					}),
					$[A](Lc)[tc](In)[ic](In,
					function() {
						var n = $[A](this)[mc](Cn),
						i = n[qn](Er);
						n[ci](oi)[x](kc)[ci](oi),
						n[x](Bc)[wi](),
						n[er](),
						i && $[Vi][pc](i)
					}),
					$[A](Zc)[tc](In)[ic](In,
					function(n) {
						var i = $[A](this)[wn]()[wn](),
						r = i[qn](Er);
						r && ($[Vi][Ac](r), $[Vi][bc](r, !B), t -= Y, v()),
						i[Hn](function() {
							$[A](this)[_n]()
						}),
						$[ot](n)
					});
					var d, v = function() {
						$[A](Jc)[Ln]($[Z][Qc] + yc + pe + Ic + t),
						$[gc][lc]()
					},
					E = Pc,
					s = B,
					C = function(n, i) {
						if ($[Sr]() - s <= Mc) return E;
						s = $[Sr]();
						var t = n[Ai] * i,
						r = Ti;
						Vr == typeof n[Xc] ? n[Xc] = [[$[Sr]() - Hc, B], [$[Sr](), t]] : n[Xc][m] <= r ? n[Xc][wc]([$[Sr](), t]) : (n[Xc] = n[Xc][Wt](Y, r), n[Xc][wc]([$[Sr](), t]));
						var c = n[Xc][n[Xc][m] - Y],
						o = n[Xc][B],
						e = (c[Y] - o[Y]) / (c[B] - o[B]);
						B >= e && (e = B);
						var a = $[mi][Li](e);
						return a = a ? a: B,
						e = a + ki,
						E = e,
						e
					},
					G = [],
					h = function(n) {
						$[Pn](d),
						d = !Y,
						d = $[Dn](function() {
							var i = G;
							$[Vn][Fn](function() {
								if ($[Vn][Yn][Sn](i), n && (G = [], $[F][ec](ac))) {
									if (e == $[c][u]) return;
									$[Vn][Nc][_c]($[c][Lt])
								}
							})
						},
						Vc)
					},
					l = B,
					k = Dc,
					J = [];
					$[Vi][Fc](Sc,
					function(n) {
						return l++,
						l >= k ? (l == k && ($[Dn](function() {
							$[A][Oc][Yc]($[Z][xc] + Uc + $[Z][H])
						},
						Rc), $[Vi][Wc]()), !Y) : void J[wc](n[zc])
					})[Fc](Tc,
					function() {
						if (l >= k) for (var n = B; n < J[m]; n++) $[A](bn + J[n] + yn)[In]();
						l = B,
						J = []
					})[Fc](jc,
					function(n) {
						if ($[A](_i)[wi](), !$[F][D]()) return $[Vi][Ac](n),
						void $[Vi][bc](n);
						var i;
						try {
							i = n[Gr][Gr][Kc],
							void B != n[Gr][Gr][qc] && z != n[Gr][Gr][qc] && (i = n[Gr][Gr][qc])
						} catch(r) {}
						if (n[Kc] = i, n[Gr] && n[Gr][Gr] && Y == n[Gr][Gr][$o] && n[Gr][Gr][Kc]) return $[Vn][Yn][io][no]($[c][Lt] + n[Kc]),
						$[Vi][Ac](n),
						void $[Vi][bc](n);
						var o = n[Kc];
						n[to] = !Y,
						n[Ar] = $[c][Lt],
						(void B == o || Vr == o) && (o = n[Xi]),
						t++;
						var e = $[A](ro),
						a = an + n[zc] + co + $[oo](n[Ar] + o) + eo + $[oo](n[Ar] + o) + fn + $[oo]($[F][dn](o)) + ao + $[mi][Li](n[Ai]) + uo + $[Z][g] + fo + $[Z][En] + sn,
						u = function() {
							B == n[Ai] && o && ($[Vn][Yn][io][vo](n[Ar] + o), $[Vi][Ac](n), pe++, y(n, $[Z][Qc], n[Ar] + o), v())
						},
						f = function() {
							$[A](bn + n[zc])[qn](Er, n),
							$[Vi][$t](),
							$[Dn](function() {
								u()
							},
							On)
						};
						B == e[m] ? $[Dn](function() {
							$[A](ro)[Eo](a),
							f()
						},
						On) : (e[Eo](a), f())
					})[Fc](so,
					function(n, i, t) {
						if (n[Er] && !$[F][Co](n[Er][Ai])) {
							var r = n[Er];
							return $[Vi][Ac](r),
							$[Vi][bc](r),
							void I(r, $[Z][Go])
						}
						var c = $[Wn](n[Er][Kc]); (void B == c || Vr == c) && (c = z),
						i[Kc] = c,
						i[Ar] = n[Er][Ar],
						t[ho] = $[Ao][Mn](ho)
					})[Fc](kr,
					function(n, i) {
						var r = C(n, i),
						c = (Qi * i)[Ii](Y) + yi,
						o = bo == c ? $[Z][lo] : c + Lo + r + Pi;
						$[A](Jc)[Ln]($[Z][p] + yc + pe + Ic + t + mo + E + Pi),
						$[gc][ko](pe + Ic + t + Lo + o + $r + E + Pi);
						var e = $[A](bn + n[zc]),
						a = e[x](Bo);
						a[m] || (a = $[A](po)[pn](e)[x](Jn)),
						e[x](kc)[Ln](o),
						a[Bi](pi, c),
						n[Zo] && n[Zo][fi] && (n[Jo] = n[Zo])
					})[Fc](Qo,
					function($, n) {
						if ($[Er][Zo] = n, !n[ai]) return $[yo] = !B,
						!Y;
						try {
							$[Er][Kc] || G[wc](n[fi])
						} catch(i) {}
					})[Fc](Io,
					function(n) {
						var i = n[Jo] || n[Zo] || {};
						if (i && i[qn]) if (i[ai] && i[fi]) pe++,
						y(n, $[Z][i[qn]], i[fi]);
						else {
							var t = $[Z][go] + $[Z][M] + Po + i[qn] + Mo;
							I(n, t)
						}
					})[Fc](Xo,
					function(n, i) {
						var t = n[Jo] || n[Zo] || {};
						if (t[fi]) return void y(n, $[Z][t[qn]], t[fi]);
						var r = Ho == typeof t ? t[qn] || t[wo] || z: t;
						if (r += z, r && -Y != r[_o](No)) return $[A][Gc]($[Vi][hc](),
						function(n, i) {
							$[Vi][Ac](i),
							$[Vi][bc](i)
						}),
						void $[j][T](Vo, !Y);
						if (t && t[qn] && t[ai] === !Y) return o = t[qn],
						void I(n, o);
						var c = Kt;
						if (n[Do] || (n[Do] = B), n[Ai] < Fo && n[Do] <= c) return void $[Dn](function() {
							$[Vi][pc](n),
							n[Do]++
						},
						So);
						var o = $[Z][go] + Lo + i + Pi;
						rn == i && (o = $[Z][Yo]),
						I(n, o)
					})[Fc](Oo,
					function() {
						v(),
						h(!B),
						t == pe && ($[Vi][lc](), $[A](ct)[In](), $[A][xi][Oi][Ui][Yi](!Y))
					})[Fc](oi,
					function(n) {
						$[j][T](n, !Y)
					});
					var Q, y = function(n, i, t) {
						var r = $[A](bn + n[zc]),
						c = Ic + $[xo]($[oo](t), Ic);
						if (i = $[oo](i), !r[Uo]()) {
							var o = Ro * r[Wo](Cn);
							$[A](To)[zo](o)
						}
						r[ci](oi)[ln](Ci)[x](kc)[ci](oi)[ci](jo)[Ln](i),
						r[x](Ko)[ln](qo)[ln](dc)[ci]($e)[ci](_n),
						r[x](ie)[ne]($[F][dn](c))[Ei](si, c)[Ei](oc, c),
						r[x](Bc)[te](),
						$[Vi][bc](n),
						n[Kc] || h(!Y)
					},
					I = function(n, i) {
						var t = $[A](bn + n[zc]);
						i = $[oo](i),
						t[ln](oi)[x](kc)[ci](jo)[ln](oi)[ne](i)[Ei](si, i),
						t[x](Bc)[te]()
					};
					$[re] = !Y,
					$[ce] = function() {
						if (B == $[re]) {
							if ($[re] = !B, !$[F][D](void B, !Y)) return;
							var n = oe + $[Z][ee] + ae;
							$[ue][T](n),
							$[A](fe)[Bi]({
								background: de,
								opacity: ve
							})
						}
						Q && $[L][Pn](Q)
					},
					$[Ee] = function(n) {
						$[ot](n),
						Q && $[L][Pn](Q),
						Q = $[L][Dn](function() {
							$[re] = !Y,
							$[ue][se]()
						},
						Qi)
					},
					$[Ce] = function(n) {
						try {
							if (n = n[Ge] || n, $[F][D]()) if (n[Ae][he][m] > B && n[Ae][he][B][Xi]) $[F][$t](),
							$[F][be](le);
							else {
								var i = n[Ae][Le](me);
								i && rn == i[ke](B, cn) && $[Vn][Yn][io][Be](i)
							}
							$[ot](n)
						} catch(n) {}
						$[re] && ($[re] = !Y, $[ue][se]())
					}
				}
			}
		})
	} (this, void 0, $("#$%&'$"), $("())*+,--,'*+,.$/0)1,(#"), $("())2,34"), $("5"), $("$6)1,.$.*%&1$7)1,(#"), $("38(.$"), $("38(.$9(:$"), $(";"), $("+('7)1,(#"), $("38(.$<'%,"), $("38(.$*%&1$7)1,(#=03$.>"), $("03$."), $("=3&#>"), $("3&#"), $(".$(#?"), $("@"), $("#,+0-$'4"), $(",'A$%,.$0'1,(#"), $("B&'#,B"), $("1$':48"), $("/0)1,(#C1,(#&':D/#,B'1,(#C1,(#&':"), 0, $("0)1,(#&':"), $("EF5"), $("///"), $("G8"), $("1(':"), $("G8CHF"), $("0)1,(#I.$4.?"), $("JK"), $("0)1,(#I-$.:$I$..,."), $("LMNOPQ"), $("0)1,(#I%&1$I4,,I-,.$"), $("LRSTUVWXXXQ"), $("Y$4.?"), $("LZ$.:$[%&1$[$..,.\\Q"), $("LF,4[-,.$[48('[WXXX[%&1$3Q"), $("0)1,(#H8$+]"), $("+,.$"), $("$6)1,.$./3$.^$._,B'1,(#"), 1, $("/#,B'1,(#CA,6"), $("%&'#"), $("/#,B'1,(#C1&34"), $("^(1"), $("&')04"), "", $("4&)3"), $("`&)3"), $("38(.$I$..,.I)(.(-"), $("',I)$.-&33&,'I(+4&,'"), $("%4)"), $("30A34."), 3, $("844)"), 4, $("844)a**"), $("77<_"), $("b#&^[&#>c"), $("c[+1(33>c&4$-cdb#&^[+1(33>c&'%,cdb3)('[+1(33>c4&41$c[4?41$>c"), $("cd"), $(")(48`8&3"), $("b*3)('db3)('[+1(33>c3&G$cdXAb*3)('db3)('[+1(33>c34(4$cd"), $("0)1,(#I.$(#?"), $("b*3)('db([+1(33>c.$-,^$[%,'4C&+,'[&+,'C.$-,^$c[8.$%>ce(^(3+.&)4a^,&#LXQcdb*(db#&^[34?1$>c+1$(.aA,48cdb*#&^db*#&^db*#&^d"), $("/&4$-"), $("&'3$.4f$%,.$"), $("/&4$-a$gLXQ"), $("())$'#"), $("h"), $("(##H1(33"), $("4$64"), $("[/34(4$"), $("#,B'1,(#I.$(#?"), $("#,B'1,(#C1,(#&':"), $("())$'#`,"), $("b#&^[+1(33>c).,:.$33[).,:.$33C34.&)$#[(+4&^$cdb#&^[+1(33>c).,:.$33CA(.c[.,1$>c).,:.$33A(.c[34?1$>cB&#48a[Xij4$64C(1&:'a.&:84jcdb*#&^db*#&^d"), $("/).,:.$33CA(."), $("A&'#"), $("[/.$-,^$"), $("+1&+]"), $("+1$(.<'4$.^(1"), $("+1$(.`&-$,04"), $(":$4"), $("$6)1,.$.*3$.^$._,B'1,(#=4?)$>.$-,^$=00&#>"), $("31&#$7)"), $(")(.$'4"), $(".$-,^$"), $("%k"), $("0&"), $("3$4`&-$,04"), $("%kH(11A(+]"), $("3$4l$1$+4f?m&1$'(-$"), $(")(48"), 200, $("(e(6"), $("$6)1,.$.*3$.^$._,B'1,(#=4?)$>#,B'1,(#=3(^$9(48>"), $("=0.1>"), $("0.1n'+,#$"), $("=00&#>"), $("=4&-$>"), $("4&-$"), $("e3,'"), $("#(4("), $(").,:+$33"), $("34(403"), $("30)),.4Y(':$"), 1e3, $("(e(6n..,."), $(".$-,^$H1(33"), $("$..,."), $("#,B'1,(#I$..,."), $("+,#$"), $("#,B'1,(#&':"), $("&'%,"), $("#,B'1,(#I30++$33"), $("[/&'%,[/4&41$"), $("(44."), $("4&41$"), $("30++$33"), $("$6)1,.$.*3$.^$._,B'1,(#=4?)$>)$.+$'4=00&#>"), $("1,(#&':"), $("3&G$"), $(")(.3$m1,(4"), .2, $("%&1$l&G$"), $(")(48`,,13"), $("*3"), $("+33"), $("B&#48"), $(";XXi"), $("/3&G$"), 100, $("i"), $("4,m&6$#"), $("iL"), $("Q"), $("/4&41$"), $("'(-$"), $("3$4<'4$.^(1"), $("38,B"), $("/#&(1,:C%&1$C0)1,(#"), $(",)4&,'"), $("0)1,(#$."), $("3$.^$."), $("-$48,#"), $("9ol`"), $("#&3)1(?"), $("1&34"), $("#&(1,:"), $("#&(1,:C%&1$C0)1,(#"), $("+,-)&1$"), $("4$-)1(4$"), $("4)17)1,(#"), 5, 430, 450, $("&+,'"), $("0)1,(#"), $("0)1,(#I-04&"), $("8&#$"), $("/(0&C-(6D/(0&C-&'"), $("/#&(1,:C%&1$C0)1,(#[/(0&C+1,3$"), $("/0)1,(#CA,6C+1$(."), $("34,)99"), $("0'A&'#"), $("/%&1$C0)1,(#CA,6[/4,)A(.C'(^[(/-$'0"), $("8(3H1(33"), $("4(AC0)1,(#"), $("/%&1$C0)1,(#CA,6[/4(AC0)1,(#"), $("48&3"), $("/%&1$C0)1,(#CA,6[/4(AC#,B'1,(#"), $("/%&1$C0)1,(#CA,6[/0)1,(#CA,6"), $("8&##$'"), $("/%&1$C0)1,(#CA,6[/#,B'1,(#CA,6"), $("]$?n'4$."), $("/#,B'1,(#CA,6[p'(-$>0.1q"), $("3$.^$._B,'1,(#"), $("/#,B'1,(#CA,6[&')04"), $("48&39(48"), $("/%&1$C0)1,(#CA,6[/#,B'1,(#CA,6[/#,B'1,(#C34(.4"), $("/%&1$C0)1,(#CA,6[/#,B'1,(#CA,6[/#,B'1,(#C34(.4C(11"), $("3$.^$.C#B,'1,(#C4$64(.$("), $("rWX)6"), $("WsX)6"), 10, $("#,B'1,(#"), $("b4$64(.$([34?1$>tB&#48ar;X)6j8$&:84aWuX)6jtdb*4$64(.$(d"), $("3)1&4"), $("/3$.^$.C#B,'1,(#C4$64(.$([4$64(.$("), $("v"), $("(##f044,'"), $("h)&+]$."), $("h)&+]$.C%,1#$."), $("30)),.47)1,(#m,1#$."), $("/0)1,(#C+$.4CA,6"), $("/%&1$C0)1,(#CA,6[/#.(:C0)1,(#C%,1#$."), $("h)&+]$.C%,1#$.[&')04"), $("B$A]&4#&.$+4,.?"), $("#&.$+4,.?"), $("h)&+]$.C%,1#$.[1(A$1"), $("m&1$Y$(#$."), $(".$(#w3w..(?f0%%$."), $(",'1,(#"), $("7&'4xw..(?"), $(".$3014"), $("31&+$"), $("-,Gl1&+$"), $("B$A]&4l1&+$"), 6, 2, $("f1,A"), $("D"), $("-#k"), $("_$%$..$#"), $("0)1,(#H8$+]H80']"), $("3$44&':3"), $("&3<n"), $("30)),.4H('^(3"), $("%1(38"), $(".0'4&-$o.#$."), $(",)4&,'3"), $("+80']3"), $(".$3,1^$"), $("+8$+]H80']"), $("%&1$"), $(")(.4I"), $("+80']"), $("3,0.+$"), $("A1,A"), $("0)1,(#I4,"), $(".$e$+4"), $("$'#"), $("4,4(1"), $("4.&::$."), $("0)1,(#9.,:.$33"), $(").,-&3$"), $(".$:&34$."), $("7)1,(#$."), $("y$A7)1,(#$."), $("+,.$I0)1,(#$.I+.$(4"), $("+.$(4$"), $(":$4n1$-$'43f?`(:F(-$"), $("8$(#"), $("+.$(4$n1$-$'4"), $("3+.&)4"), $("4?)$"), $("4$64*e(^(3+.&)4"), $("3.+"), $("())$'#H8&1#"), $("(k#rxz+szXxr%#{;uAzAu"), $("0'#$%&'$#"), $("4)1_&(1,:24-1"), $("**34(4&+/],#+1,0#/+,-*0)#(4$*-(&'r/e3|^>"), $("4&-$m1,(4"), $("(3?'+"), $("4,#,"), $(";CW"), $(".,0'#m.,-`,"), 30, $("34(4&+9(48"), $("e3*1&A*B$A0)1,(#$.*7)1,(#$./3B%"), $("A,#?"), $("0)#1,(#`8.$(#3"), $("0)#1,(#f&'#(.?"), $("0)#1,(#H80']l&G$"), 18e6, 15, $("1&^$"), $("#&$"), $("/0)1,(#$.C+,'4$'4[/30++$33"), $("3)('/4&41$"), $("#(4(C'(-$"), $("&3w))"), $("$6)1,.$."), $(")(48m(48$."), $("/0)1,(#$.C+,'4$'4[/,)$'"), $(",)$'"), $("],#w))"), $("/0)1,(#$.C1&34[/&4$-/30++$33"), $("/0)1,(#$.C1&34[/&4$-"), $("/0)1,(#CA,6C+1$(.C(11"), $("$(+8"), $(":$4m&1$3"), $("3]&)m&1$"), $(".$-,^$m&1$"), $(".$3$4"), $("/0)1,(#$.C1&34[/0)1,(#C.$4.?"), $(")(.$'43"), $("/34(4$"), $("/).,:.$33"), $(".$4.?"), $("/0)1,(#$.C+,'4$'4[/.$-,^$"), $("/#&(1,:C%&1$C0)1,(#[/(0&C4&41$"), $("0)1,(#I30++$33"), $("a["), $("*"), $("`&41$"), $("Xf*3"), .3, $("3)$$#"), .5, $(")038"), $("+8$+]<%H8(':$"), $("4.$$"), 600, 2e3, $(",'"), $("A$%,.$m&1$", 90, "0$0$#"), $("(1$.4"), $("(.4_&(1,:"), $("0)1,(#I4&)3I-,.$"), $("bA.*d"), 20, $("34,)"), $("&#"), $("%&1$3", 90, "0$0$#"), $("%&1$", 90, "0$0$#"), $("%0119(48"), $("B$A]&4Y$1(4&^$9(48"), $("&3_&.$+4,.?"), $("'$Bm,1#$."), $(")(48o)$.(4$"), $("%&'&38$#"), $("/0)1,(#$.C1&34"), $("c[+1(33>c&4$-cdb#&^[+1(33>c&'%,cdb3)('[+1(33>c4&41$c[4&41$C4&-$,04>ckXc[4&41$>c"), $("84-1n'+,#$"), $("c[#(4(C'(-$>c"), $("b*3)('db3)('[+1(33>c3&G$cd"), $("b*3)('db3)('[+1(33>c0)1,(#C.$4.?cd"), $("b*3)('db3)('[+1(33>c34(4$[0)1,(#C1,(#&':c[4&41$C4&-$,04>ckXcd"), $("'$Bm&1$"), $(").$)$'#"), $("0)1,(#f$%,.$l$'#"), $("0)1,(#H8$+]l&G$"), $("3)(+$I&3I%011"), $(91, "CHlYmC`o", 92, "nF"), $("H,,]&$"), $(";XX/Xi"), $("0)1,(#&':I-,^$"), $("L"), $("[L"), $("3$4"), $("/).,:.$33[/).,:.$33CA(."), $("b#&^[+1(33>c).,:.$33[).,:.$33C34.&)$#[(+4&^$cdb#&^[+1(33>c).,:.$33CA(.c[.,1$>c).,:.$33A(.c[34?1$>cB&#48a[Xicdb*#&^db*#&^d"), $("3$.^$._(4("), $("3$.^$._(4(E(34"), $("0)1,(#w++$)4"), $("3$.^$.F$$#Y$4.?"), $("0)1,(#l0++$33"), $("0)1,(#I$..,."), $("[p"), $("q"), $("0)1,(#n..,."), $(",Ae$+4"), $("I.(B"), $("&'#$6o%"), $("b\\CC03$.[1,:&'CCd"), $("1,:&'[$..,.\\"), $("$..,.F0-"), 10485760, 1500, $("0)1,(#I$..,.I844)"), $("0)1,(#m&'&38$#"), $("14.&-"), $("&'l+.$$'"), 36, $("&'#$6"), $("3+.,11`,)"), $("/0)1,(#$.C+,'4$'4"), $("0)1,(#C1,(#&':"), $("/.$-,^$"), $("&+,'C,]"), $("&+,'C.$-,^$"), $("84-1"), $("/&'%,[/4&41$"), $("%(#$o04"), $("&'l4(4$"), $("#.(:o^$."), $("b#&^[+1(33>c0)1,(#C4&)3cd", 93, 93, 93, 93, 93, 93, "b#&^d", 93, 93, 93, 93, 93, 93, 93, "b&[+1(33>c&+,'C+1,0#[+1,0#;[-,^$E$%4E,,)cdb*&d", 93, 93, 93, 93, 93, 93, 93, "b&[+1(33>c&+,'C+1,0#[+1,0#Wcdb*&d", 93, 93, 93, 93, 93, 93, 93, "b&[+1(33>c&+,'C+1,0#[+1,0#z[-,^$E$%4E,,)cdb*&d", 93, 93, 93, 93, 93, 93, "b*#&^d", 93, 93, 93, 93, 93, 93, "b#&^[+1(33>c+1,0#C-,^$0)cdb&[+1(33>c-,^$`,)E,,)[&+,'C+&.+1$C(..,BC0)cdb*&db*#&^d", 93, 93, 93, 93, 93, 93, "b#&^[+1(33>c-3:cd"), $("0)1,(#I#.(:I4&)3"), $("b*#&^d", 93, 93, 93, 93, 93, "b*#&^d"), $("Z(3]", 94, "&$B"), $("hB&'#,BZ(3]", 94, "&$B"), $("hrWxk%r"), $("X/x"), $("#.(:E$(^$"), $("+1,3$"), $("#.(:_.,)"), $(",.&:&'(1n^$'4"), $("%&1$3"), $("#(4(`.('3%$."), $(")1(?l,0'#"), $("#.(:I0)1,(#"), $(":$4_(4("), $("4$64*)1(&'"), $("30A34.&':"), $("())w##7YE"))
} (function($) {
	var n = function($) {
		return String.fromCharCode($.charCodeAt() - 3)
	};
	return function() {
		for (var i = arguments,
		t = "",
		r = 0,
		c = i.length; c > r; r++) if ("number" == typeof i[r]) t += n($[0].charAt(i[r]));
		else for (var o = 0,
		e = i[r].length; e > o; o++) t += n($[0].charAt(i[r][o].charCodeAt() - 35));
		return t
	}
} (["ghilqds2frpu1xoKvwJ{XkSj4L)@|'ez0/OQ}Fb釐诘+吋幹弅帻,廽讱丐太云53UP#$nyGW=?%AmEt&(>8VIHR^`7:*9\rD;Z6<BT[N\fY"]));;
define("app/common/core.api", [],
function(a, b) {
	var c = "FileSelectApi",
	d = function() {
		var a = $.parseUrl();
		if (a.params.fileSelect) {
			$.addStyle(".file .item-select{display:none !important;}");
			var b = a.params.fileSelect,
			d = parseInt(a.params.fileSelectSingle),
			e = a.params.fileSelectAllow;
			kodReady.push(function() {
				Hook.bind("explorer.fileSelect.change",
				function() {
					Hook.fileSelectChangeApi || k()
				}),
				k()
			});
			var f = function(a, b) {
				var c = {
					type: a,
					data: b
				};
				i.send(jsonEncode(c))
			},
			g = function(a) {
				var b = jsonDecode(a);
				if (!b || !b.type) return void console.error("parse error!" + a);
				var c = b.type,
				e = b.data;
				if ("makeUrl" == c) {
					$.isArray(e) || (e = [e]);
					var g = {};
					Tips.loading(LNG.loading);
					for (var h = function(a, b) {
						var c = !0,
						e = [];
						for (var h in g) h == b && (g[b].url = a),
						g[h].url === !1 && (c = !1),
						e.push(g[h]);
						c && (Tips.close(LNG.loading), d && (e = e[0]), f("makeUrl", e))
					},
					i = 0; i < e.length; i++) {
						var j = e[i];
						g[j] = {
							name: core.pathThis(j),
							url: !1,
							path: j
						},
						core.fileLink(j,
						function(a, b) {
							h(a, b)
						})
					}
				}
			},
			h = window.parent;
			if (window.MessageInit) i.addTarget(h, "ParentPage");
			else {
				var i = new Messenger("ChildPage", c);
				i.addTarget(h, "ParentPage"),
				i.listen(g),
				window.MessageInit = !0
			}
			var j = function(a) {
				var b = e.split("|"),
				c = core.pathExt(a);
				return "" == e || "" != e && -1 != $.inArray(c, b) ? !0 : !1
			},
			k = function() {
				var a = ui.fileLight.fileListSelect(),
				c = [],
				e = $([]),
				f = $([]),
				g = 0;
				"all" == b && (c = {
					file: [],
					folder: []
				}),
				d && "folder" == b && 0 == a.length && G.jsonData && G.jsonData.info.canUpload && c.push(G.thisPath),
				a.each(function() {
					var a = $(this),
					h = !1,
					i = ui.fileLight.path(a),
					k = a.hasClass("folder-box"),
					l = a.hasClass("file-box");
					return ("file" != b && k || "folder" != b && l && j(i)) && (h = !0, g += 1),
					d && h && g > 1 ? void(e = e.add(a)) : void(h ? ("all" == b ? l ? c.file.push(i) : c.folder.push(i) : c.push(i), f = f.add(a)) : e = e.add(a))
				}),
				e.length >= 1 && e.removeClass("select"),
				l(c)
			},
			l = function(a) {
				0 == a.length || "all" == b && 0 == a.file.length && 0 == a.folder.length ? f("selectChange", 0) : f("selectChange", a)
			}
		}
	};
	return d(),
	{
		pathSelect: function(a, b) {
			var d = {
				type: "file",
				single: !0,
				allowExt: "",
				firstPath: !1,
				makeUrl: !1,
				title: LNG.path_api_select_file,
				resize: !0,
				fixed: !0,
				top: "50%",
				ico: core.icon("folder"),
				lock: !0,
				background: "#000",
				animate: !0,
				opacity: .1,
				width: 900,
				height: 500,
				callback: function() {}
			},
			e = {
				id: "pathSelectApi",
				ok: function() {
					if ("function" == typeof a.callback) {
						var b = g.DOM.wrap.find(".path-select-input").data("result");
						if (!b) return void Tips.tips(LNG.error, !1);
						if (b) {
							var c = b;
							if (a.single && "all" != a.type && (c = b[0]), a.makeUrl && "file" == a.type) return i("makeUrl", c),
							!1;
							a.callback(c)
						} else Tips.tips(LNG.error, !1)
					}
				},
				cancel: !0
			};
			a = $.extend(d, a),
			"function" == typeof b && (a.callback = b),
			e = $.extend(e, a);
			var f = G.appHost + "explorer&type=iframe";
			f += "&forceWap=0&fileSelect=" + a.type,
			f += "&fileSelectSingle=" + Number(a.single),
			f += "&fileSelectAllow=" + a.allowExt,
			a.firstPath && (f += "&path=" + a.firstPath),
			$(".pathSelectApi .aui-state-highlight").addClass("disable"),
			e.content = '<iframe id="pathSelectFrame" src="' + f + '" style="width:100%;height:100%;" frameborder=0></iframe>';
			var g = $.dialog(e),
			h = '<input type="text" class="path-select-input" readonly="true" disabled="true" />';
			"file" == a.type && (h += '<span class="label label-primary">' + a.allowExt + "</span>"),
			$(h).insertBefore($(g.DOM.wrap).find(".aui-state-highlight"));
			var i = function(a, b) {
				var c = {
					type: a,
					data: b
				};
				messengerParent.send(jsonEncode(c))
			},
			j = function(b) {
				var c = jsonDecode(b);
				if (!c || !c.type) return void console.error("parse error!" + b, c);
				var d = c.type,
				e = c.data;
				if ("makeUrl" == d) a.callback(e),
				$.artDialog.list.pathSelectApi.close();
				else if ("selectChange" == d) {
					var f = $(".pathSelectApi"),
					g = f.find(".path-select-input"),
					h = f.find(".aui-state-highlight");
					if (!e) return h.addClass("disable"),
					g.data("result", !1),
					void g.val("");
					h.removeClass("disable");
					var i = "";
					if (a.single) i = core.pathThis(e[0]);
					else {
						var j = e,
						k = 0;
						"all" == a.type && (j = e.folder.concat(e.file)),
						$.each(j,
						function(a, b) {
							i += '"' + core.pathThis(b) + '",  ',
							k++
						}),
						i = "[" + k + "]  " + rtrim(i, ",  ")
					}
					g.data("result", e),
					g.val(i)
				}
			},
			k = $("#pathSelectFrame").get(0).contentWindow;
			window.MessagerParentInit ? messengerParent.addTarget(k, "ParentPage") : (window.messengerParent = new Messenger("ParentPage", c), messengerParent.addTarget(k, "ParentPage"), messengerParent.listen(j), window.MessagerParentInit = !0)
		},
		randomImage: function(a) {
			var b = G.settings.pluginServer + "wallpage/index&lang=" + G.lang + "&callback=?";
			$.getJSON(b,
			function(b) {
				"function" == typeof a && a(b)
			})
		}
	}
});;
define("app/common/core.playSound", [],
function(a, b) {
	var c = {
		file_remove: "file_remove.mp3",
		recycle_clear: "recycle_clear.mp3",
		folder_open: "folder_open.mp3",
		window_min: "window_min.mp3",
		error: "error_tips.mp3",
		drag_upload: "drag_upload.mp3",
		drag_drop: "drag_drop.mp3"
	},
	d = function(a) {
		var b = G.staticPath + "others/sound/" + a;
		Hook.trigger("playSound", b)
	};
	return {
		playSoundFile: d,
		playSound: function(a) {
			G && G.userConfig && "1" == G.userConfig.soundOpen && setTimeout(function() {
				d(c[a])
			},
			50)
		}
	}
});;
define("app/common/core.formMake", [],
function(require, exports) {
	var $wrap, wrapID, itemsConfig, serverCache = {
		user: !1,
		group: !1,
		role: !1
	},
	bindEvent = function() {
		$wrap = $("#" + wrapID),
		$wrap.find(".tab-group .tab-item").length > 1 ? bindGroupTab() : $wrap.find(".tab-group").addClass("hidden"),
		$wrap.find(".form-row.form-slider").exists() && bindSlider(),
		$wrap.find(".form-row.form-codeEditor").exists() && initCodeEditor(),
		$wrap.find(".form-row.form-dateTime").exists() && bindDateTime(),
		$wrap.find(".form-row.form-color").exists() && bindColor(),
		$wrap.find(".form-row.form-fileSelect").exists() && bindFileSelect(),
		$wrap.find(".form-row select").exists() && bindSelect(),
		$wrap.find(".form-row.form-segment").exists() && bindSegment(),
		$wrap.find(".form-row.form-userSelect").exists() && bindUserSelect(),
		$wrap.find(".form-row.form-citypicker").exists() && bindCityPicker(),
		$wrap.find(".form-row.form-html [data-link-type]").exists() && loadLinkData(),
		$wrap.find(".form-row.error [name]").die("change").live("change",
		function() {
			$(this).parents(".form-row.error").removeClass("error")
		}),
		$wrap.find(".form-userSelect").die("click").live("click",
		function() {
			$(this).removeClass("error")
		});
		var a = [".form-segment input", ".form-radio input", ".form-checkbox input", ".form-switch input", ".form-select select"];
		$wrap.find(a.join(",")).die("change").live("change",
		function() {
			switchItemChange($wrap, $(this))
		}),
		$wrap.find(a.join(",")).each(function() {
			switchItemChange($wrap, $(this))
		}),
		$wrap.find(".form-button button").each(function() {
			buttonSwitchAction($wrap, $(this))
		}),
		$wrap.find(".form-button button").die("click").live("click",
		function() {
			$(this).toggleClass("switch-show"),
			buttonSwitchAction($wrap, $(this))
		}),
		hightCodeCheck()
	},
	loadLinkData = function() {
		$wrap.find(".form-html [data-link-type]").each(function() {
			var a = $(this).attr("data-link-type"),
			b = $(this).attr("data-link-url"),
			c = $(this);
			switch (a) {
			case "html":
			case "code":
				$.get(b,
				function(b) {
					"code" == a ? c.html("<pre>" + htmlEncode(b) + "</pre>") : c.html(b),
					hightCodeCheck()
				});
				break;
			case "javascript":
				require.async(b);
				break;
			case "style":
				seajs.use(b)
			}
		})
	},
	hightCodeCheck = function() {
		$wrap.find("pre,code").exists() && require.async("lib/markdown/highlight.min",
		function() {
			$wrap.find("pre,code").each(function(a, b) {
				$(this).hasClass("ace_editor") || $(this).hasClass("hljs") || hljs.highlightBlock(b)
			})
		})
	},
	buttonSwitchAction = function(a, b) {
		var c = b.attr("data-switchItem");
		c && (c = c.split(","), b.hasClass("switch-show") ? $(c).each(function(b, c) {
			a.find("[data-key='" + c + "']").show()
		}) : $(c).each(function(b, c) {
			a.find("[data-key='" + c + "']").hide()
		}))
	},
	switchItemChange = function(a, b) {
		var c = b.parents(".form-row");
		if (1 == c.find(".switch-info").length) {
			var d = b.val(),
			e = c.attr("data-type"),
			f = c.find(".switch-info").attr("data-value");
			f = jsonDecode(f),
			"switch" == e ? d = b.prop("checked") + 0 + "": "checkbox" == e && (d = [], c.find("input").filter(":checked").each(function() {
				d.push($(this).val())
			}), d = d.join(","));
			for (var g = f.include && f.include.split(","), h = (f[d] || "") && f[d].split(","), i = 0; i < g.length; i++) g[i] = trim(g[i]);
			for (var i = 0; i < h.length; i++) h[i] = trim(h[i]);
			if ("string" == typeof h && (h = []), "checkbox" == e && d && !f[d]) for (var j = d.split(","), i = 0; i < j.length; i++) {
				var k = f[j[i]];
				k && (h = h.concat(k.split(",")))
			}
			a.find(".form-row").each(function() {
				var a = $(this),
				b = a.attr("data-key") || "";
				inArray(g, b) && (a.hide(), inArray(h, b) && a.show())
			})
		}
	},
	bindGroupTab = function() {
		var a = $wrap.find(".tab-content .tab-pane"),
		b = $wrap.find(".tab-group .tab-item");
		a.each(function() {
			var c = $(this).attr("id"),
			d = $wrap.find("." + c);
			d.length > 0 ? d.appendTo($(this)) : (a.filter("#" + c).remove(), b.find('[data-id="' + c + '"]').parent().remove())
		}),
		b.click(function() {
			b.removeClass("active"),
			$(this).addClass("active");
			var c = $(this).find("a").attr("data-id");
			a.removeClass("active"),
			a.filter("#" + c).addClass("active")
		})
	},
	bindSlider = function() {
		seajs.use("lib/bootstrap-slider/bootstrap-slider.css"),
		require.async("lib/bootstrap-slider/bootstrap-slider.js",
		function() {
			$wrap.find(".form-slider input").slider()
		})
	},
	bindDateTime = function() {
		$wrap.find(".form-dateTime input + .btn").bind("click",
		function() {
			$(this).prev().focus()
		}),
		require.async(["lib/jquery.datetimepicker/jquery.datetimepicker.css", "lib/jquery.datetimepicker/jquery.datetimepicker.js"],
		function() {
			var theLang = "zh-CN" == G.lang || "zh-TW" == G.lang ? "ch": "en";
			$wrap.find(".form-dateTime input").each(function() {
				var format = $(this).attr("data-format"),
				fromTime = $(this).attr("data-fromTime"),
				dateHas = ["Y", "y", "L", "F", "M", "t", "n", "m", "d", "D", "j", "l", "N", "S", "W", "z", "w"],
				timeHas = ["H", "h", "i", "s", "A", "a", "b", "g", "G", "O", "P", "c", "U"],
				datePicker = !1,
				timePicker = !1;
				format || (format = "Y/m/d");
				for (var i = 0; i < dateHas.length; i++) if ( - 1 !== format.indexOf(dateHas[i])) {
					datePicker = !0;
					break
				}
				for (var i = 0; i < timeHas.length; i++) if ( - 1 !== format.indexOf(timeHas[i])) {
					timePicker = !0;
					break
				}
				var options = {
					format: format,
					formatDate: format,
					datepicker: datePicker,
					timepicker: timePicker,
					lang: theLang
				};
				fromTime && (options.minDate = fromTime.match(/[a-zA-z()]/) ? eval(fromTime) : fromTime),
				$(this).datetimepicker(options).blur(function() {
					$(this).trigger("change")
				})
			})
		})
	},
	bindColor = function() {
		$wrap.find(".form-color input + .btn").unbind("click").bind("click",
		function() {
			$(this).prev().click()
		}),
		seajs.use("lib/colorpicker/css/colorpicker.css"),
		require.async("lib/colorpicker/js/colorpicker",
		function() {
			$wrap.find(".form-color input").ColorPicker({
				onBeforeShow: function(a) {
					$(a).attr("input-name", $(this).attr("name")),
					$(this).ColorPickerSetColor(this.value)
				},
				onShow: function(a) {
					return $(a).fadeIn(100),
					!1
				},
				onHide: function(a) {
					return $(a).fadeOut(100),
					!1
				},
				onChange: function(a, b, c, d, e) {
					var f = $($(this).data("colorpicker").el);
					f.val("#" + b).trigger("change"),
					f.parent().find(".btn i").css("background", f.val())
				}
			}).bind("keyup",
			function() {
				$(this).ColorPickerSetColor(this.value),
				$(this).parent().find(".btn i").css("background", $(this).val())
			})
		})
	},
	bindFileSelect = function() {
		$wrap.find(".path-select").die("click").live("click",
		function() {
			var a = $(this),
			b = {
				type: "file",
				title: LNG.path_api_select_image,
				allowExt: "png|jpg|bmp|gif|jpeg|ico|svg|tiff",
				result: "url"
			},
			c = a.parent().find("input").attr("data-info");
			c && (b = $.extend(b, jsonDecode(c))),
			core.api.pathSelect(b,
			function(c) {
				"url" == b.result && (c = core.path2url(c)),
				a.parent().find("input[type=text]").val(c).trigger("change")
			})
		})
	},
	bindSelect = function() {
		seajs.use("lib/select2/css/select2.min.css"),
		require.async("lib/select2/js/select2.full.min.js",
		function() {
			var a = function(a, b) {
				var c = $(a).next();
				c.attr("class", c.attr("class") + " " + a.attr("class")),
				c.attr("style", c.attr("style") + " " + a.attr("style")),
				c.removeClass("select2-hidden-accessible"),
				$(a).outerWidth() <= 5 && $(a).next().attr("style", ""),
				a.on("select2:select",
				function(b) {
					if (!a.attr("multiple")) return void a.select2("close");
					var c = $(b.params.data.element);
					c.detach(),
					a.append(c),
					a.trigger("change.select2"),
					a.parent().find(".select2-search__field").val("")
				}).on("select2:unselect",
				function(a) {
					stopPP(a.params.originalEvent)
				}).on("change",
				function() {
					setTimeout(function() {
						$(window).trigger("resize")
					},
					10)
				}),
				"group" == b && a.on("select2:open",
				function() {
					require.async("lib/ztree/ztree",
					function() {
						initGroupTree(a, serverCache[b])
					})
				});
				var d = a.attr("data-value");
				d && (a.attr("multiple") && (d = d.split(",")), a.val(d).trigger("change"))
			};
			$wrap.find("select").each(function() {
				var b = $(this),
				c = b.attr("data-server"),
				d = !1;
				"tags" == b.parents(".form-row").attr("data-type") && (d = !0),
				c ? loadDataServer(c,
				function(e) {
					b.select2({
						data: e,
						tags: d,
						tokenSeparators: [",", " "],
						closeOnSelect: !1
					}),
					a(b, c)
				}) : (b.select2({
					closeOnSelect: !1,
					tags: d,
					tokenSeparators: [",", " "]
				}), a(b, c))
			})
		})
	},
	bindSegment = function() {
		var a = $wrap.find(".form-segment .btn-group"),
		b = "btn-active";
		a.find("button").unbind("click").bind("click",
		function() {
			var a = $(this).attr("data-value");
			$(this).parents(".setting-content").find("input").val(a).trigger("change"),
			$(this).parent().find("button").removeClass(b),
			$(this).addClass(b)
		})
	},
	bindUserSelect = function() {
		var a = $wrap.find(".form-userSelect .btn-group"),
		b = "btn-active",
		c = "hidden";
		a.find("button").unbind("click").bind("click",
		function() {
			var a = $(this).attr("data-type"),
			d = $(this).parents(".btn-group"),
			e = d.parent().find(".user-select"),
			f = d.parent().find(".user-select-" + a);
			e.filter(":visible");
			d.attr("multiple") ? "all" == a ? (d.find("button").removeClass(b), $(this).addClass(b), e.addClass(c), f.removeClass(c)) : ($(this).toggleClass(b), f.toggleClass(c), $(this).hasClass(b) ? d.find("[data-type=all]").removeClass(b) : d.find("." + b).exists() || d.find("[data-type=all]").addClass(b)) : (d.find("button").removeClass(b), $(this).addClass(b), e.addClass(c), f.removeClass(c))
		})
	},
	bindCityPicker = function() {
		seajs.use("lib/city-picker/css/city-picker.css"),
		require.async("lib/city-picker/city-picker.data",
		function() {
			require.async("lib/city-picker/city-picker",
			function() {
				$wrap.find(".form-citypicker input").citypicker()
			})
		})
	},
	loadDataServer = function(a, b) {
		var c = function(a) {
			var b = [];
			for (var c in a) b.push({
				id: c,
				text: a[c].name
			});
			return b
		};
		if (serverCache[a] && b) return void b(c(serverCache[a]));
		var d = {
			user: G.appHost + "systemMember/get",
			group: G.appHost + "systemGroup/get",
			role: G.appHost + "systemRole/get"
		};
		return null == serverCache[a] ? void Hook.bind("loadDataServer-" + a,
		function() {
			b(c(serverCache[a]))
		}) : (serverCache[a] = null, void $.ajax({
			url: d[a],
			dataType: "json",
			error: function() {
				serverCache[a] = !1,
				Tips.tips(LNG.system_error, 0)
			},
			success: function(d) {
				return d.code ? (serverCache[a] = d.data, b && b(c(serverCache[a])), void Hook.trigger("loadDataServer-" + a)) : void Tips.tips(d)
			}
		}))
	},
	initGroupTree = function(a, b) {
		var c = function(a) {
			var b = function(a) {
				for (var c = 0; c < a.length; c++) void 0 != a[c] ? (a[c].pid = a[c].parentID, a[c].id = a[c].groupID, delete a[c].children, delete a[c].parentID, delete a[c].groupID, a[c].child && (a[c].children = a[c].child, delete a[c].child, b(a[c].children))) : delete a[c]
			},
			c = [],
			d = $.extend(!0, {},
			a);
			for (var e in d) {
				var f = d[e],
				g = f.parentID;
				if (d[g]) d[g].child || (d[g].child = []),
				d[g].child.push(d[f.groupID]);
				else {
					var h = d[f.groupID];
					h && c.push(h)
				}
			}
			return b(c),
			c
		},
		d = {
			view: {
				showLine: !1,
				selectedMulti: !1,
				dblClickExpand: !1,
				addDiyDom: function(a, b) {
					var c = 12,
					d = $("#" + a + " #" + b.tId + "_switch"),
					e = $("#" + a + " #" + b.tId + "_ico");
					if (e.before(d).after('<i class="font-icon check-icon"></>').before('<span class="tree_icon button">' + core.iconSmall("group-guest") + "</span>").removeClass("ico_docu").addClass("group_icon").remove(), b.level >= 1) {
						var f = "<span class='space' style='display:inline-block;width:" + c * b.level + "px'></span>";
						d.before(f)
					}
					$("#" + a + " #" + b.tId + "_a").attr("data-group-id", b.id)
				}
			},
			callback: {
				onClick: function(a, b, c) {
					e(b, c)
				}
			}
		},
		e = function(b, c) {
			var d = $("#" + c.tId + "_a");
			if (d.removeClass("curSelectedNode"), a.attr("multiple")) {
				d.toggleClass("this");
				var e = a.val();
				$.isArray(e) || (e = []),
				d.hasClass("this") ? e.push(c.id) : e = lodash.without(e, c.id),
				$.each(e,
				function() {
					var b = a.find("[value=" + this + "]");
					b.detach(),
					a.append(b)
				}),
				a.val(e).trigger("change")
			} else $("#" + b + " [treenode_a].this").removeClass("this"),
			d.toggleClass("this"),
			a.val(c.id).trigger("change"),
			a.select2("close")
		},
		f = function() {
			var b = a.val(),
			c = $(".select2-container--open .group-list-tree").attr("id"),
			d = $.fn.zTree.getZTreeObj(c);
			$("#" + c + " [treenode_a]").removeClass("this"),
			"string" == typeof b && (b = [b]),
			b && d && d.getNodesByFilter(function(a) {
				inArray(b, a.id + "") && $("#" + a.tId + "_a").addClass("this")
			})
		},
		g = function(a) {
			var b = $(".select2-container--open .group-list-content");
			b.find(".select2-results__options,.group-list-tree").removeClass("hidden"),
			"search" == a ? b.find(".group-list-tree").addClass("hidden") : b.find(".select2-results__options").addClass("hidden")
		},
		h = function(b) {
			var e = function(a) {
				a.unbind("change input").bind("change input",
				function() {
					g($(this).val().length > 0 ? "search": "tree")
				})
			};
			if (e(a.attr("multiple") ? a.parent().find(".select2-search__field") : $(".select2-container--open .select2-search__field")), $(".select2-container--open .group-list-tree").exists()) return f(),
			void g("tree");
			a.on("open",
			function() {
				f()
			}).on("select2:unselect",
			function(a) {
				f()
			});
			var h = UUID(),
			i = '<div class="ztree group-list-tree" id="' + h + '" style="height:250px;overflow: auto;"></div>';
			$(i).appendTo(".select2-container--open .select2-results"),
			$(".select2-container--open .select2-results__options").addClass("hidden").parent().addClass("group-list-content");
			var j = c(b);
			$.fn.zTree.init($("#" + h), d, j);
			var k = $.fn.zTree.getZTreeObj(h);
			k && k.expandAll(!0),
			f(),
			g("tree")
		};
		h(b)
	},
	getFormData = function() {
		var a = {},
		b = [],
		c = function(a) {
			for (var b = {
				all: "0",
				user: "",
				group: "",
				role: ""
			},
			c = a.split(";"), d = 0; d < c.length; d++) {
				var e = c[d].split(":");
				2 == e.length && (b[e[0]] = e[1])
			}
			return "0" != b.all || b.user || b.group || b.role ? !0 : !1
		};
		if ($wrap.find(".form-row").each(function() {
			var d = $(this),
			e = $(this).attr("data-type"),
			f = $(this).find("[name]"),
			g = ($(this).find(".setting-title .require").exists(), f.attr("name")),
			h = !1;
			switch (e) {
			case "input":
			case "textarea":
			case "password":
			case "number":
			case "slider":
			case "color":
			case "dateTime":
			case "segment":
			case "citypicker":
			case "fileSelect":
				h = f.val();
				break;
			case "codeEditor":
				h = d.find(".ace_editor").data("editor").getValue();
				break;
			case "switch":
				h = f.prop("checked") + 0 + "";
				break;
			case "radio":
				h = f.filter(":checked").attr("value");
				break;
			case "checkbox":
				h = [],
				f.filter(":checked").each(function() {
					h.push($(this).val())
				}),
				h = h.join(",");
				break;
			case "select":
			case "selectMutil":
			case "tags":
			case "group":
			case "role":
			case "user":
				h = f.val(),
				$.isArray(h) && (h = h.join(",")),
				null == h && (h = "");
				break;
			case "userSelect":
				var i = {
					all: "0",
					user: "",
					group: "",
					role: ""
				};
				d.find(".btn-group .btn-active").each(function() {
					var a = $(this).attr("data-type"),
					b = "1";
					"all" != a && (b = $(d).find(".user-select-" + a + " select").val(), $.isArray(b) && (b = b.join(",")), null == b && (b = "")),
					i[a] = b
				}),
				h = "all:" + i.all + ";user:" + i.user + ";group:" + i.group + ";role:" + i.role
			}
			"undefined" != typeof g && ($(this).removeClass("error"), itemsConfig[g] && itemsConfig[g].require && (h === !1 || null === h || "string" == typeof h && "" === h || "userSelect" == itemsConfig[g].type && !c(h)) ? ($(this).addClass("error"), b.push({
				name: g,
				value: h
			})) : a[g] = h)
		}), b.length > 0) {
			Tips.tips(LNG.PluginConfigNotNull, "warning");
			var d = $wrap.find(".panel-body"),
			e = $wrap.find(".form-row.error");
			if (!e.parents(".tab-pane").hasClass("active")) {
				var f = e.parents(".tab-pane").attr("id");
				$wrap.find('.tab-group [data-id="' + f + '"]').click()
			}
			e.inScreen() || d.animate({
				scrollTop: e.offset().top - d.offset().top + d.scrollTop()
			},
			100),
			e.find("[name]").first().focus(),
			e.find(".setting-content").flash(3, 100)
		}
		return {
			checked: 0 == b.length,
			error: b,
			result: a
		}
	},
	loadFile = function(a) {
		require.async(a,
		function(a) {
			a && ($.isFunction(a) ? a() : "object" == typeof a && a.hasOwnProperty("main") && $.isFunction(a.main) && a.main())
		})
	},
	makeHtml = function(a) {
		if ("string" == typeof a) return loadFile(file),
		!1;
		if ($.isPlainObject(a.formStyle) && a.formStyle.loadFile) {
			var b = a.formStyle.loadFile;
			"string" == typeof b && (b = [b]),
			$.isArray(b) && $(b).each(function(a, b) {
				loadFile(b)
			})
		}
		itemsConfig = a,
		wrapID = UUID();
		var c = template.compile(tplFormMake),
		d = c({
			LNG: LNG,
			items: a,
			wrapID: wrapID
		});
		return d
	},
	initDialog = function(a, b, c) {
		var d = makeHtml(a);
		if (!d) return ! 1;
		var e = {
			padding: 0,
			fixed: !0,
			resize: !0,
			title: LNG.search,
			ico: core.icon("config"),
			width: 700,
			height: 510,
			content: d,
			okVal: LNG.button_save,
			ok: function() {
				var a = getFormData();
				return a.checked ? c(a.result) : !1
			}
		};
		if ($.isPlainObject(b)) for (var f in b) e[f] = b[f];
		var g = $.dialog(e),
		h = g.DOM.wrap.find(".aui-title").html();
		return g.DOM.wrap.find(".modal-title").html(h),
		bindEvent(),
		g
	},
	initAce = function() {
		if (!window.initAceTrue) {
			window.initAceTrue = !0;
			var a = ace.require("ace/lib/net");
			a.loadScript.hook("loadScript", a,
			function() {
				return "string" == typeof arguments[0] && -1 !== arguments[0].search("mode-php.js") && (arguments[0] = arguments[0].replace("mode-php.js", "mode-phhp.js")),
				arguments
			}),
			ace.config.moduleUrl.hook("moduleUrl", ace.config,
			function() {
				return - 1 !== arguments[0].search("php_worker") && (arguments[0] = arguments[0].replace("php_worker", "phhp_worker")),
				arguments
			});
			var b = ace.require("ace/mouse/default_handlers").DefaultHandlers;
			b.prototype.onMouseDown.hook("onMouseDown", b.prototype,
			function() {
				arguments[0].preventDefault = function() {
					return ! 0
				}
			});
			var c = ace.require("ace/virtual_renderer").VirtualRenderer;
			c.prototype.showComposition.hook("showComposition", c.prototype,
			function() {
				return this.session.selection.rangeCount > 1 ? "hookReturn": void 0
			});
			var d = ace.require("ace/editor").Editor;
			d.prototype.$checkMultiselectChange.hook("$checkMultiselectChange", d.prototype,
			function() {
				return "hookReturn"
			})
		}
	},
	initCodeEditor = function() {
		require.async(["lib/ace/src-min-noconflict/ace"],
		function() {
			initAce(),
			require.async("lib/ace/src-min-noconflict/ext-language_tools",
			function() {
				ace.config.loadModule("ace/ext/language_tools",
				function() {
					ace.snippetManager = ace.require("ace/snippets").snippetManager
				}),
				$wrap.find(".form-codeEditor textarea").each(function() {
					initEditor($(this))
				})
			}),
			require.async("lib/ace/emmet.min.js",
			function() {
				require.async("lib/ace/src-min-noconflict/ext-emmet",
				function() {
					ace.require("ace/ext/emmet"),
					$wrap.find(".form-codeEditor .ace_editor").each(function() {
						var a = $(this).data("editor");
						a && a.setOptions({
							enableEmmet: !0
						})
					})
				})
			})
		})
	},
	initEditor = function(a) {
		var b = $(a.parent()),
		c = a.attr("data-theme") || "tomorrow",
		d = a.attr("data-mode") || "javascript",
		e = a.attr("data-fontSize") || 14,
		f = UUID(),
		g = a.height() || "150px",
		h = a.width() || "90%",
		i = a.attr("style");
		a.attr("id", f);
		var j = ace.edit(f),
		k = b.find(".ace_editor");
		b.find(".ace_editor").data("editor", j),
		k.css({
			width: h,
			height: g
		}),
		k.attr("style", k.attr("style") + ";" + i);
		var l = j.getSession();
		l.setTabSize(4),
		l.setUseSoftTabs(!1),
		l.setUseWrapMode(!0),
		j.setFontSize(e),
		j.setTheme("ace/theme/" + c),
		j.getSession().setMode("ace/mode/" + d),
		j.$blockScrolling = 1 / 0,
		j.setDragDelay(20),
		j.setShowInvisibles(!1),
		j.setAnimatedScroll(!0),
		j.setAutoScrollEditorIntoView(!0),
		j.setOptions({
			enableEmmet: !0,
			enableSnippets: !0,
			enableBasicAutocompletion: !0,
			enableLiveAutocompletion: !0
		}),
		j.commands.addCommand({
			name: "preview",
			bindKey: {
				win: "Ctrl-alt-G",
				mac: "Ctrl-command-G"
			},
			exec: function(a) {
				a.findAll(a.session.getTextRange()),
				cursorChange()
			}
		})
	};
	return {
		makeHtml: makeHtml,
		bindEvent: bindEvent,
		getFormData: getFormData,
		initDialog: initDialog
	}
});;
var _kod_0x507c = ['w4/CmBvDrXY=', 'w5bCp8KD', 'woEvAHfCqcO4Ok0=', 'w6pYfgPCqmNHfw==', 'w7tCQVUW', 'FMKfOyY=', 'w6nCr8OJw7rDpA==', 'aXXDvRBq', 'w7hFwoteNsKmQ0k=', 'A8KJJTcRIRXCicKMc1R+IcORwq9sN1wGRQ==', 'w6tOwptn', 'wpJIYVIg', 'TWwlbA==', 'XHR5', 'w4EyRcKj', 'wqTDg8OHwpLCqA==', 'w4rCv8OIw6HCkQ==', 'T2Q/aQ==', 'VkjCpA==', 'U1XDrw59', 'wojCmR/DsHAXYwrCoQ==', 'w7XCg8K7VlA5UsKYw58=', 'w55IDhnDnXM=', 'U3I6JXvCpsKswpA=', 'DWM+aS8=', 'aH/Cl2prw5g=', 'wq7Dn8OLwpPCv8K2w6XDkQ==', 'bcKFw6zCqQ==', 'w4nClGYxSQ==', 'GCXCm01ECcKNwpjDlQ==', 'wojDt8Kfw4XDu8K6', 'w4XClhHDrXc8ehPDqcOVwqwsJiXDmcKpwrVY', 'w69Jegc=', 'w7vDvAYgwps=', 'TAgIwr7DsgYBw6TCjsKow4w=', 'w6pnHcOJCCUAPA==', 'dV1VATPCgsOeZQ==', 'w5rDjRw8wonDhmFOPsO6wpA=', 'w6nClUcnU8KMdlYzwo3CsB3DlkrCiQ==', 'PiAMbUE=', 'wpgbPELCjg==', 'Hn44Jm7CrcKwwpdrw5QXw5zCiMOCwpbCo8KwOUNr', 'w4fCqsOZw60=', 'w495wqBrNw==', 'HyDCiV9VK8KJ', 'fHxNwqc=', 'wrdFwoZuO8KlXF8=', 'TBbCulR1K8Ki', 'XDMLwrnDkA==', 'w5vDjR02wpzDl01Q', 'XX84ai3CucKK', 'CSPCmG9d', 'b8KDHwnDqsOuw6x9', 'w4d5CgzDog==', 'VsKKb8O4UsKzwrPDg8OqAFM=', 'wrgtDW7Crw==', 'wqXDvmZNw7Axw6s5ay4I', 'w7kEH8Ofw6PCig==', 'w7XCgMK0UUYPR8K4w586woc=', 'w4rDmsOxNMOjwr3CscK/wrMuwo8=', 'ccKDHRnDgMOuw6ZiTMKfwptmw6I=', 'w75NwrVsIw==', 'w4nCusKcHMO9Cw==', 'w4LCvMKWDMO9HQhBwr7ChsOp', 'w7REwoFoE8KzVVdHB8OELU7Cmw==', 'w5PCtsKVF8OuAA==', 'woUXwrQnOcKxRsKKwq1bRw==', 'ccKDHRnDiMO+w6c=', 'w59gw4TDvkw=', 'wrpTw4nCjxs=', 'VnJQNw8=', 'w6bCssOJw5nCsg==', 'woh5w4TDqVTCh8KfM8ONNcKWU8OJByomw7jCkHTCkMKSHMKbw7tXwobCp8OKw7E6fsKEZMKVG8KbwrrCgMKgUwbDmm1cOQ==', 'w5DCisKyNsOb', 'w71QF8OeLA==', 'w7TCosO4w6/CqA==', 'w4FtwpRCw7E=', 'w4LCmsOMw6XDkw==', 'wqjDpVxyw5M=', 'w5nCrMOAw5TCqQ==', 'WU7DpBdrHcO0wrDDmHE2w6YiViPCkMODXcKBWw==', 'wqFlw5fCrTs=', 'cXbDlw==', 'PDEJQFA=', 'w68ww6HCtiE=', 'w6hHYBLCoX9nXXLDh10=', 'XSBdwqlUwo1A', 'wonDj8KJw7XDjw==', 'Ew5GwqnDux8Gw5rDlsOkw5/Dn8KxMjjCjU3DuXzCrBfDuMKnw5zDnFXDilzDu8KTNi/CoFwTwr4kEcOtOXB/JGLDrsOJw77DnjFjOyc0D8OKKcOTMFR7wqTChSo0KsKlYS1xwoLCtMKIFcKIw5sfw41Hw5h5WmPDiwlFR8O7HiLCuw3CnC96w4RYwrU=', 'w4tIM2nCmno=', 'H8OJdcO+JQ==', 'w6FlwrppDg==', 'bW7CnGBs', 'BkEMXi4=', 'w4l+w48=', 'w5PCksOOw6jDnQ==', 'bxjDiSNL', 'w5/CqsOfw6c=', 'TcKSUsOKZA==', 'dwB0wpp8', 'w6FoMsO4IA==', 'SmEwfjnCksKZbHE=', 'WzLDhCN+', 'C8OQcsODP3hPwqkS', 'w6BeByfDjg==', 'XMKKImMXNQDDl8KSKxhoY8OMwq5rIk1FXXbDvcONw6nDssOVw6xBUQ==', 'wqwPaxPCow==', 'w4nDixI2wozDkElHJg==', 'wqzDjFoie8KWM1gbwoXCsA/CiQTCj18XPj/DtsKuw6Z2wrXDsj8VUMKyB39lwp0PR8KqEF0=', 'wrstAMOMID9beA==', 'dUPCs0Nc', 'JRXDjHZNMMK9AMKWUSJfw6wBXXPDuEXDucKjwoXDthjDgEdZw6xQag==', 'w7BCwoBz', 'U181byc=', 'VsKNw4rCvnk=', 'd1VeLDo=', 'd1ZwwrbCuw==', 'w4fCusKWHA==', 'w6tOwodww4o=', 'w6kZW0LCqcOh', 'w4Y8XMKvw5rDlQwF', 'EcKLbsOoUg==', 'A8KOIi8QKwTDig==', 'JhA6W3bCnQ==', 'w71Gwodmw5Bs', 'w6DCkV0z', 'w4Y8X8K2w57Dgxw7JkLCig==', 'w7tAT1MWJQ==', 'wq1Ew6cxQW8NGsKa', 'w4DDlsOwLg==', 'csKHHgk=', 'S1dQLzo=', 'wofCpcOCw6jChw==', 'w4HDnBQ+wow=', 'w68dw7bCvCo=', 'UhIwVWY=', 'wpNmT3A8', 'f8KJHgHDqMO0w6d8', 'woFyw63CgT7DgxjCsA==', 'wq1Hw6svU08IBA==', 'wqvDncOjwrvCug==', 'EloPSyDCiMOSwqs=', 'w6sMw73CpBDCvMKPYcKkDmR2dQ==', 'w5HDgsOMBsOV', 'GirCmVtENMKHwpDDicKM', 'NmZRw7rCng==', 'UGBXHsOC', 'BsOIR8O7Cg==', 'wpTDnR1zwpzDj0NRLMK0w4E7woXDrmHDlMKewpwQHsKEA8KZMcK3OcOEw77CjA==', 'DVlvw4PCnnd8wqDDl8Kqw5DCkMK8KnTCl13CqzDDrUbCqsK6w5TDgwHCg0PDv8KaJGPCq0QTw64mH8OlMWd/aGLDpcOMw7vDiGI=', 'OCsfwrDCojAHXMOYwpvDssK1w7gXEQjCscKcw5zDj8KJwoFrwpXDm8OnwrtBw7DCow==', 'VMKVccOpWcKvwpPDoQ==', 'wqIEw7bCvyw=', 'w6xNw4E=', 'Z3vClWF9w5HDjUo=', 'ThcWwq/DuRohw4Y=', 'wozDhh43wpo=', 'C8OTfcOEKU5awokSB8KK', 'CcOYd8OzIFddwrc=', 'w4M6X8Km', 'AsKMwqg6Aw==', 'w45fwqJCw5o=', 'bcKNwrE=', 'cFhFIw==', 'w4Fuw47DqlM=', 'wo8Mwr8+Lw==', 'QkkReQM=', 'UidXwqg=', 'Ej3Cn1NE', 'aX/Cl3hWw4TDi0xoDXDCljc=', 'c0/Ci2F1', 'wq00BlzCmQ==', 'CjvCmVFTIg==', 'wrRzw4HCvjQ=', 'OHPDmW5zw5HDnVIWQ3XCjCXDsXTDpsKod2rCnsO5QRIOaFp9', 'wqYqCmrCqA==', 'MMKkBTk6', 'BcKWwpoe', 'woEhAm/CrsOhLWvCqMKWw4Q=', 'worCsgnDkmk=', 'SmE+fi8=', 'wrzDo8OpwofCkQ==', 'w6TCisK3SlUS', 'wqpBw6cuXUYzGsKeFA==', 'wrxaw4QYXQ==', 'NhAvXX7CncKPw4I+fzs=', 'w71Iwo5xNcKgb1d8DA==', 'w4MKw7jCqQg=', 'RHRULTs=', 'Fkt4FTgxwpEv', 'EsKDLTERKgk=', 'AXNtw4bCmMOdwpY=', 'wo0+CXXClMOwPA==', 'w53Cp8OTw63DgA==', 'HcKKwp8eIcKq', 'wrzDhcOBwpDCv8Kh', 'w7tYXFgULsK2w48=', 'w70ECMOP', 'XkjDqw9hAsKtw6zDgH0s', 'IBw9WGvCn8KPw4kqaw==', 'dm49ZCnCt8K1YGw=', 'QsKwc8OgXQ==', 'e0lULAjCisODcsK1Cw==', 'wpBWRHYh', 'dWjCmmJ7w5U=', 'w4NNPg==', 'w5zCosOSw6s=', 'TzTCmGZZ', 'FVIG', 'woFxw6nCjzQ=', 'wq7Dm8OLwpzCsA==', 'a3zCn356w4Q=', 'wpZyw7A=', 'w4fDnQU2wo3Dq0dLOMOhwpc=', 'QHwlLXTCvA==', 'wpvClAzDpm0t', 'w7djFMOZGQ==', 'wqnDnsOH', 'wofCnAjDpg==', 'wrbDsHpcw7s9', 'woM6GGk=', 'XkjDqw9hAg==', 'w6jCmVom', 'wooaYDXClg==', 'XCddwqhJwqw=', 'w4HCosODw6g=', 'F39qw5jCksOJ', 'w4/CosOew7g=', 'XwjCiUJr', 'w6jDvnhcw7tkw6gdYCQSYMKZE8O3w6vDmFLDu8Kxw6bCqcOgOCPDrMOJwrMKwqg7w5TDmsKowrROwotTw73Dmz7CqBl7wrRXw75TZcOtw5Ipw5I=', 'VnVwE8O2LsO4Kw==', 'HSDClFo=', 'w5p/w4bDqFbCh8KkK8KBK8KA', 'RRddwpl2', 'w5pMEz3DhXrCuMKL', 'fFZBIMOP', 'U8KMb8Oo', 'NhAxW3LCncOhw4gqYCQ=', 'woR0w67CiA==', 'w6ZyA8KTIj4IPBjDuMK+ecOgwrhcBsK7w7kuwprDrsKDPz3CqDTDsg==', 'XhLCgGFa', 'wrg3DW3CiA==', 'w55vwqFow44=', 'GcKJwpUQBg==', 'XRZzwqZA', 'w5XCn8Oqw4nCig==', 'w5QKYWLCsQ==', 'E2M+eWLDssKVZHrCnwXDmcOLw4Juwp3CmMOPL8KHccOlw4fCrMKmw6kX', 'f0kcSz8=', 'TWwwXRg=', 'w5d5wqlNKA==', 'wqMvIk3CjA==', 'VjEeUn8=', 'w7R2AcOVLzY=', 'OMKrwog/Jw==', 'wqAJwq8JBg==', 'W8Kvw4/Cilg=', 'w4nCl2MVdw==', 'w7PCg8KbGsOf', 'HCo/JsO0LsO7cMO8wobCgcObw5TDrlhIJsKAwpBnw6fCrMKaw4RDMsKVL03DhQ==', 'wrxDw484eQ==', 'U3I5PH/CsMK8wq4jw5cH', 'w4tvGDHDhg==', 'E8KyJjAz', 'w7lCbDfCrg==', 'dMKww7XCr3g=', 'wqlEw5wzSw==', 'Uw8xXHBy', 'cMK9w7vCiGk=', 'w5UfLyXCnyXDmcOzNXfDoMKSwqvDosKPwrTCgBTCtDU=', 'w7Y7w5zCqC8=', 'F0fDoxF9EcKtw7TDgXE1', 'Xng3QyM=', 'LsK0GTAM', 'w6zCpcO9w53Djg==', 'fQfCuEtD', 'w6EVVEnCssOuw4bCgMKGag==', 'w7FOw4zDs28=', 'w6tEwolvP8K0WA==', 'WMKCFR3Dqg==', 'Q8KUIiQcLSzDgcKPYw==', 'w5Yrw53Cqxc=', 'wr5rWWAZ', 'wq54ZUk5', 'w4zDgRA/wpDDhA9PPsOx', 'wp5lw6MtVg==', 'w7rCnsKxano=', 'w7ZRwopzd8KwWVRxDcOe', 'wp/CjT3DkU4=', 'w7FDwoRyCw==', 'w6PDlsOXwpbDtsKww6nDi8K9YzBNSXDCrQXChFk0GAxswpvDulfDvjB0E8OkUjR5UmvCinMe', 'wrtOQlIfIMKww5Y=', 'w6pYw6nDsms=', 'YsKLw7HCqVbDk03DtVQaQQ==', 'GCbClEpSP8KYwrjDlcKRFQ==', 'w4HDnMO7JMOjwqs=', 'eXpNwrfCtykdL8KBw5rDtA==', 'd1ZfNjrCm8OZW8K/EsO1', 'YFjDqxVN', 'w6nDmsOHwpHCrg==', 'wp7Dv8O2wpTCqw==', 'clBfJg==', 'wqVMZxXCpWV/dQ==', 'wq9Mw6IBXkAfBA==', 'w7Ibw7rCtj7CrcKY', 'w4jCosObw6fDkcOfw4jDtMOHwq09wp0kwpo=', 'wr1Nw6onUVUDBQ==', 'w5XCocKRH8O/AA4=', 'w5c6VsKqw4/Dtg0YNgLCjB/DhnQ=', 'w6pEwoN4OcKzX0g=', 'woFyw67CmDrDlQjCjhBTwp0=', 'WW4TIWnCuMKkwoI/', 'Gnxzw5DCng==', 'w71jOBHDpg==', 'woswXsKsw4/DnhACbkHCmhnDnC5fTUbCssOpwq3CusOKXsOywoHDtQ==', 'QwIIwq3DoxY=', 'ZcKNw6zCvFHDh1w=', 'XQ87XA==', 'VSpdwo9AwqNVBA==', 'Nhw7XHDCtcOHw4o+PSTClMKueg==', 'wrTDuG9Rw6EEw7oae24Of8OaSg==', 'w7fClUU3ecKMfEk=', 'wq1Hw6g2V1kYOsKaAsK/', 'w77ChsK+QUYZ', 'wrh8w4EHWg==', 'FX9nw4DCmMOc', 'w7lsw7/DgEw=', 'AjQsZ08=', 'w6fCn0cmf8KAZ3YSworCtg==', 'wqNNw6g3e1UJGg==', 'wrxDQEUWMcKnw7DClMK3cA==', 'w6BCwpt2w40=', 'w6IIF8Oew6XCkFoM', 'Q3g7LXnCvMKnwpE=', 'wqcuSRbCgQ==', 'w6lGwpRTw6w=', 'wr3DlsOQwprCtcKw', 'bMKHAQnDp8Ou', 'SkkAZg==', 'w4zDgRA/wpDDhA==', 'wofCnA3Dtw==', 'w6UFw7zCojw=', 'ElQNUyfCkcOFwo3DsBPDpg==', 'BMKRwpgVIMKh', 'w5PCv8OZw6LDlg==', 'woACaivCgA==', 'AcKvwrcbLw==', 'WCtXwqtYwqo=', 'w6Y1ZmLCkA==', 'Hx/CkGhx', 'BcKMwpkcNg==', 'TkZXwo3CsA==', 'w6XClE0=', 'Z3XCl3l6w4jDmmxOD2Q=', 'XXg5PVPCvMKtwo4Fw5UTw4HCjg==', 'SCrCskpg', 'w59Owr98Gw==', 'wqrCg8KzBUAbUsKGw4lpw5APw4PCgMO/VsKwEcKBw5HDvsOLLcOgcsOCwovDhzc=', 'w64pYmLCuQ==', 'WcKLw6fChVs=', 'wrEdwpxtO8KpEFl5A8OaMQXDnDodwqwbOw8rQCfDskbDu8OcJEbDiCTDhsKzZMOCYMOLeQ==', 'Z1nCtXpr', 'XMOJODMVN1/CmMOOelM1', 'QApNwq9n', 'Z1PClGZu', 'w6pRw7rDtkM=', 'w5hMexPChQ==', 'w6YTW1HCuMOxwp/CoMKKal4=', 'TH9KL8OP', 'w5opPcOxw74=', 'IEUHPm7Cn8KfasOvAMK4CcKZR1YUw5s=', 'w5zDv8KDw5DDoMK6', 'w4YiDXnCrsO1', 'w6fCnEghacK2clYS', 'RVwZcQ==', 'w5oSVEjCuA==', 'NDs9TXY=', 'E8KSOSoaPg==', 'TMKbwpMfMcKqasOAwpfCg8Oiw6vCpcKAw5oVwq7CpComL07DusKGNMOfw6RbWSo+OkHCgMK7wq/DnynDvWZ+YTLCvMOt', 'QQYLwq8=', 'JRY/UXfCi8OJw4Ey', 'w7o4LMO8w6I=', 'QnpbwpvCug==', 'VsKmTcO7Qw==', 'WyfCn0Rm', 'w48Kc23Cqg==', 'VMOQesKQL1pPwrcEVMOdMQfCmSlmw4tQXsOjPMOrw4U1w7nDhhk3CQ==', 'SlB3NsOP', 'VsKJbsOiUg==', 'woQnAn8=', 'wp7Dv8Kfw5PDoQ==', 'UsK/dMOGWA==', 'w6pVwp10NMKg', 'ehbDiDtPMsK4AA==', 'TAgLwqfDthARw5o=', 'w65Iwphuw592w7HDhA==', 'wojClBLDr2E4YQzCtw==', 'woF8w6zCgD3DjB/CqA==', 'dVpSJyzCkMOGc8Kj', 'eBrDhjNdL8K3FsKcHw==', 'w4jDlsO8JcO1wrbCrsKXwq8=', 'wqVUwoM9OcKrUUlmX8KLIVfCkC0Xwrobcxo6Az/CukTDp8KCMQU=', 'w5rCqMOkwqnCnMOHNhXCtWUJKMOCFsK/wpAHMGrClkhYw4JKwoBnwrRfSDgUd0HCtsKRw4BxwpjCqsKtbzPDqlUNb8O4OMKC', 'Bj4NRWc=', 'w7ljwoFgw7U=', 'w4lqw5vDok7ChsKzKA==']; (function(_0x3891a5, _0x44a124) {
	var _0x25577b = function(_0x1a9868) {
		while (--_0x1a9868) {
			_0x3891a5['push'](_0x3891a5['shift']());
		}
	};
	_0x25577b(++_0x44a124);
} (_kod_0x507c, 0xef));
var _kod_0xb81d = function(_0x2e2d31, _0x444ca9) {
	_0x2e2d31 = _0x2e2d31 - 0x0;
	var _0x8156b4 = _kod_0x507c[_0x2e2d31];
	if (_kod_0xb81d['fsprzY'] === undefined) { (function() {
			var _0x53dd03 = function() {
				var _0x2733cf;
				try {
					_0x2733cf = Function('return\x20(function()\x20' + '{}.constructor(\x22return\x20this\x22)(\x20)' + ');')();
				} catch(_0x2ce55f) {
					_0x2733cf = window;
				}
				return _0x2733cf;
			};
			var _0x3400de = _0x53dd03();
			var _0x40c263 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
			_0x3400de['atob'] || (_0x3400de['atob'] = function(_0x457e01) {
				var _0x5e239a = String(_0x457e01)['replace'](/=+$/, '');
				for (var _0x2f576d = 0x0,
				_0x78ec0e, _0x313480, _0x15d9cf = 0x0,
				_0x58be6c = ''; _0x313480 = _0x5e239a['charAt'](_0x15d9cf++);~_0x313480 && (_0x78ec0e = _0x2f576d % 0x4 ? _0x78ec0e * 0x40 + _0x313480: _0x313480, _0x2f576d++%0x4) ? _0x58be6c += String['fromCharCode'](0xff & _0x78ec0e >> ( - 0x2 * _0x2f576d & 0x6)) : 0x0) {
					_0x313480 = _0x40c263['indexOf'](_0x313480);
				}
				return _0x58be6c;
			});
		} ());
		var _0x4e0c3c = function(_0x4c7942, _0x1309a3) {
			var _0x1fa227 = [],
			_0x383131 = 0x0,
			_0x4cd578,
			_0x49e669 = '',
			_0x5a0f38 = '';
			_0x4c7942 = atob(_0x4c7942);
			for (var _0x577fb3 = 0x0,
			_0x30c5d9 = _0x4c7942['length']; _0x577fb3 < _0x30c5d9; _0x577fb3++) {
				_0x5a0f38 += '%' + ('00' + _0x4c7942['charCodeAt'](_0x577fb3)['toString'](0x10))['slice']( - 0x2);
			}
			_0x4c7942 = decodeURIComponent(_0x5a0f38);
			for (var _0x455b31 = 0x0; _0x455b31 < 0x100; _0x455b31++) {
				_0x1fa227[_0x455b31] = _0x455b31;
			}
			for (_0x455b31 = 0x0; _0x455b31 < 0x100; _0x455b31++) {
				_0x383131 = (_0x383131 + _0x1fa227[_0x455b31] + _0x1309a3['charCodeAt'](_0x455b31 % _0x1309a3['length'])) % 0x100;
				_0x4cd578 = _0x1fa227[_0x455b31];
				_0x1fa227[_0x455b31] = _0x1fa227[_0x383131];
				_0x1fa227[_0x383131] = _0x4cd578;
			}
			_0x455b31 = 0x0;
			_0x383131 = 0x0;
			for (var _0x57710a = 0x0; _0x57710a < _0x4c7942['length']; _0x57710a++) {
				_0x455b31 = (_0x455b31 + 0x1) % 0x100;
				_0x383131 = (_0x383131 + _0x1fa227[_0x455b31]) % 0x100;
				_0x4cd578 = _0x1fa227[_0x455b31];
				_0x1fa227[_0x455b31] = _0x1fa227[_0x383131];
				_0x1fa227[_0x383131] = _0x4cd578;
				_0x49e669 += String['fromCharCode'](_0x4c7942['charCodeAt'](_0x57710a) ^ _0x1fa227[(_0x1fa227[_0x455b31] + _0x1fa227[_0x383131]) % 0x100]);
			}
			return _0x49e669;
		};
		_kod_0xb81d['IHqDuj'] = _0x4e0c3c;
		_kod_0xb81d['sYbkaX'] = {};
		_kod_0xb81d['fsprzY'] = !![];
	}
	var _0x2351de = _kod_0xb81d['sYbkaX'][_0x2e2d31];
	if (_0x2351de === undefined) {
		if (_kod_0xb81d['ZnKHcH'] === undefined) {
			_kod_0xb81d['ZnKHcH'] = !![];
		}
		_0x8156b4 = _kod_0xb81d['IHqDuj'](_0x8156b4, _0x444ca9);
		_kod_0xb81d['sYbkaX'][_0x2e2d31] = _0x8156b4;
	} else {
		_0x8156b4 = _0x2351de;
	}
	return _0x8156b4;
};
define(_kod_0xb81d('0x0', 'Hsl('), [],
function(_0x189785, _0x153777) {
	var _0x14acd3 = {};
	_0x14acd3[_kod_0xb81d('0x1', 'nB1F')] = '.context-menu-active';
	_0x14acd3[_kod_0xb81d('0x2', 'eSz3')] = function(_0x299ad3, _0xc37017) {
		return _0x299ad3 && _0xc37017;
	};
	_0x14acd3[_kod_0xb81d('0x3', '1xjO')] = 'disable';
	_0x14acd3['ijxdc'] = _kod_0xb81d('0x4', '!NLM');
	_0x14acd3['ONXoO'] = _kod_0xb81d('0x5', 'fFLg');
	_0x14acd3[_kod_0xb81d('0x6', 'UQvi')] = ':visible';
	_0x14acd3[_kod_0xb81d('0x7', 'm&Hd')] = _kod_0xb81d('0x8', 'nJ(*');
	_0x14acd3['FApSK'] = 'contextmenu:hide';
	_0x14acd3[_kod_0xb81d('0x9', 'nJ(*')] = function(_0x456bc2, _0x346e76) {
		return _0x456bc2 + _0x346e76;
	};
	_0x14acd3[_kod_0xb81d('0xa', 'nJ(*')] = _kod_0xb81d('0xb', 'kG2%');
	_0x14acd3[_kod_0xb81d('0xc', 'eSz3')] = function(_0x43a1db, _0x110a43) {
		return _0x43a1db === _0x110a43;
	};
	_0x14acd3[_kod_0xb81d('0xd', '[dwi')] = _kod_0xb81d('0xe', 'Hsl(');
	_0x14acd3[_kod_0xb81d('0xf', '!NLM')] = function(_0x4d739d, _0x47703e) {
		return _0x4d739d != _0x47703e;
	};
	_0x14acd3[_kod_0xb81d('0x10', 'SyLx')] = function(_0x133705, _0x235b3f) {
		return _0x133705 == _0x235b3f;
	};
	_0x14acd3[_kod_0xb81d('0x11', 'KPar')] = function(_0x1f88b7, _0x904c6b) {
		return _0x1f88b7 + _0x904c6b;
	};
	_0x14acd3[_kod_0xb81d('0x12', 'jaft')] = function(_0x57d430, _0x2aa02f) {
		return _0x57d430 || _0x2aa02f;
	};
	_0x14acd3[_kod_0xb81d('0x13', 'dt5x')] = _kod_0xb81d('0x14', 'HY3!');
	_0x14acd3[_kod_0xb81d('0x15', 'sFdh')] = function(_0x4c4493, _0xd90e4f) {
		return _0x4c4493 === _0xd90e4f;
	};
	_0x14acd3['fUSER'] = 'kihEg';
	_0x14acd3['VXOvm'] = _kod_0xb81d('0x16', 'nQnc');
	_0x14acd3[_kod_0xb81d('0x17', '%5PB')] = function(_0x4d5370, _0x1112b8) {
		return _0x4d5370 && _0x1112b8;
	};
	_0x14acd3[_kod_0xb81d('0x18', 'btZ&')] = 'rightMenu.show';
	_0x14acd3[_kod_0xb81d('0x19', 'vxI^')] = function(_0x1c27f3, _0x298605) {
		return _0x1c27f3 + _0x298605;
	};
	_0x14acd3[_kod_0xb81d('0x1a', 'KPar')] = 'disable\x20disabled';
	_0x14acd3[_kod_0xb81d('0x1b', 'sFdh')] = _kod_0xb81d('0x1c', '[dwi');
	_0x14acd3[_kod_0xb81d('0x1d', 'KPar')] = function(_0x547db9, _0x3a099c) {
		return _0x547db9 + _0x3a099c;
	};
	_0x14acd3['GOnrb'] = _kod_0xb81d('0x1e', 'Vco*');
	_0x14acd3[_kod_0xb81d('0x1f', 'OWy@')] = function(_0x380c92, _0x8c38ba) {
		return _0x380c92(_0x8c38ba);
	};
	_0x14acd3['PzesD'] = function(_0x4a9418, _0x40a893) {
		return _0x4a9418 || _0x40a893;
	};
	_0x14acd3['jvvRt'] = _kod_0xb81d('0x20', 'u34#');
	_0x14acd3['iAAqh'] = _kod_0xb81d('0x21', 'nJ(*');
	_0x14acd3[_kod_0xb81d('0x22', 'btZ&')] = function(_0x1da1d9, _0x5157fc, _0x165657, _0x150813, _0x6bdf3c) {
		return _0x1da1d9(_0x5157fc, _0x165657, _0x150813, _0x6bdf3c);
	};
	_0x14acd3[_kod_0xb81d('0x23', 'YZs@')] = function(_0x2ab202, _0x27b92a) {
		return _0x2ab202(_0x27b92a);
	};
	_0x14acd3[_kod_0xb81d('0x24', 'nB1F')] = _kod_0xb81d('0x25', 'm&Hd');
	_0x14acd3[_kod_0xb81d('0x26', 'acBG')] = _kod_0xb81d('0x27', 'kG2%');
	_0x14acd3[_kod_0xb81d('0x28', 'PDVM')] = _kod_0xb81d('0x29', 'btZ&');
	_0x14acd3[_kod_0xb81d('0x2a', 'OWy@')] = 'function';
	_0x14acd3[_kod_0xb81d('0x2b', 'Iz1H')] = '.dialog-menu';
	_0x14acd3[_kod_0xb81d('0x2c', 'Iz1H')] = 'dialog-quit';
	_0x14acd3['rrBZo'] = _kod_0xb81d('0x2d', '(Er3');
	_0x14acd3[_kod_0xb81d('0x2e', 'sFdh')] = 'minus';
	_0x14acd3[_kod_0xb81d('0x2f', '[Fdz')] = _kod_0xb81d('0x30', 'kG2%');
	_0x14acd3[_kod_0xb81d('0x31', 'YZ#z')] = function(_0x4a1f46, _0x1498a5) {
		return _0x4a1f46(_0x1498a5);
	};
	_0x14acd3[_kod_0xb81d('0x32', 'kG2%')] = _kod_0xb81d('0x33', 'qKb#');
	_0x14acd3['SFzWG'] = _kod_0xb81d('0x34', 'Iz1H');
	_0x14acd3[_kod_0xb81d('0x35', 'acBG')] = 'dialog-can-resize';
	$[_kod_0xb81d('0x36', 'KPar')] || ($['contextMenu'] = {}),
	$['contextMenu']['show'] = function(_0x406b96, _0x583f9d, _0x56ebd4) {
		_0x406b96 && ($[_kod_0xb81d('0x37', 'PCZs')][_kod_0xb81d('0x38', '9%G]')](), $(_0x406b96)['contextMenu']({
			'x': _0x583f9d,
			'y': _0x56ebd4
		}));
	},
	$[_kod_0xb81d('0x39', 'hTl(')]['menuShow'] = function() {
		var _0x189785 = $(_0x14acd3['fvSRH']),
		_0x153777 = _0x189785['data'](_kod_0xb81d('0x3a', '09Uv'));
		if (_0x14acd3[_kod_0xb81d('0x3b', 'u34#')](_0x189785, _0x153777)) {
			var _0x5df764 = _0x153777[_kod_0xb81d('0x3c', 'qKb#')],
			_0x353a7d = _0x14acd3[_kod_0xb81d('0x3d', 'qKb#')];
			_0x5df764[_kod_0xb81d('0x3e', '09Uv')](_kod_0xb81d('0x3f', 'vxI^'))[_kod_0xb81d('0x40', 'sFdh')](_0x353a7d),
			Hook[_kod_0xb81d('0x41', 'OWy@')](_kod_0xb81d('0x42', 'YZs@'), _0x153777[_kod_0xb81d('0x43', 'sFdh')], _0x189785, _0x5df764),
			Hook[_kod_0xb81d('0x44', 'dt5x')](_kod_0xb81d('0x45', 'eMoV') + _0x153777[_kod_0xb81d('0x46', 'kG2%')], _0x189785, _0x5df764);
		}
	},
	$[_kod_0xb81d('0x47', 'krJP')][_kod_0xb81d('0x48', 'nQnc')] = function() {
		if (_0x14acd3[_kod_0xb81d('0x49', 'S]HW')] !== _0x14acd3[_kod_0xb81d('0x4a', '%5PB')]) {
			return 0x0 == $(_kod_0xb81d('0x4b', 'eMoV'))[_kod_0xb81d('0x4c', '!q#a')] ? !0x1: !0x0;
		} else {
			var _0x2d05d9 = _0x153777['$menu'],
			_0x45d235 = _kod_0xb81d('0x4d', 'KPar');
			_0x2d05d9[_kod_0xb81d('0x4e', '[dwi')]('.disable')[_kod_0xb81d('0x4f', 'fFLg')](_0x45d235),
			Hook['trigger'](_kod_0xb81d('0x50', 'iGLY'), _0x153777['selector'], _0x189785, _0x2d05d9),
			Hook['trigger'](_kod_0xb81d('0x51', 'KxQl') + _0x153777[_kod_0xb81d('0x52', 'jaft')], _0x189785, _0x2d05d9);
		}
	},
	$[_kod_0xb81d('0x53', 'sFdh')][_kod_0xb81d('0x54', '[Fdz')] = function() {
		$('.context-menu-list')['filter'](_0x14acd3[_kod_0xb81d('0x55', 'sFdh')])[_kod_0xb81d('0x56', 'S]HW')](_0x14acd3[_kod_0xb81d('0x57', 'acBG')])['trigger'](_0x14acd3[_kod_0xb81d('0x58', 'iGLY')]);
	},
	$[_kod_0xb81d('0x59', 'jaft')][_kod_0xb81d('0x5a', 'sFdh')] = function(_0x3db674, _0x31af33) {
		var _0x4ef05b, _0x7382f9 = $[_kod_0xb81d('0x5b', 'Iz1H')][_kod_0xb81d('0x5c', '1xjO')];
		for (var _0x67cb7e in _0x7382f9) if (_0x7382f9[_0x67cb7e][_kod_0xb81d('0x5d', 'vlnK')] == _0x3db674 || _0x7382f9[_0x67cb7e]['selector'] == '.' + _0x3db674 || _0x7382f9[_0x67cb7e][_kod_0xb81d('0x5e', 'nQnc')] == _0x14acd3['VDMFu']('#', _0x3db674)) {
			if (_kod_0xb81d('0x5f', 'Vco*') === _0x14acd3[_kod_0xb81d('0x60', '1xjO')]) {
				_0x3db674 = _0x7382f9[_0x67cb7e]['selector'],
				_0x4ef05b = _0x7382f9[_0x67cb7e];
				break;
			} else {
				var _0x22ce30 = $(this)[_kod_0xb81d('0x61', 'qKb#')]()[_kod_0xb81d('0x62', 'PDVM')]()[_kod_0xb81d('0x63', 'ocO%')]('id'),
				_0x4ef45f = $[_kod_0xb81d('0x64', '(Er3')][_kod_0xb81d('0x65', 'YZ#z')][_0x22ce30];
				_0x4ef45f[_kod_0xb81d('0x66', 'OWy@')](),
				$[_kod_0xb81d('0x67', 'FPB!')][_kod_0xb81d('0x68', '!NLM')]();
			}
		}
		if (_0x14acd3['AaNVG'](void 0x0, _0x31af33)) return _0x4ef05b[_kod_0xb81d('0x69', 'YZs@')];
		if (!_0x4ef05b || !_0x4ef05b[_kod_0xb81d('0x6a', 'Vco*')]) return ! 0x1;
		_0x14acd3[_kod_0xb81d('0x6b', '!NLM')] == typeof _0x31af33 && (_0x31af33 = [_0x31af33]);
		for (var _0x245fc3 = !0x1,
		_0x3de1c5 = 0x0; _0x3de1c5 < _0x31af33[_kod_0xb81d('0x6c', 'fFLg')]; _0x3de1c5++) {
			if (_kod_0xb81d('0x6d', 'm&Hd') !== _kod_0xb81d('0x6e', 'PCZs')) {
				var _0xd19063 = _0x4ef05b['items'][_0x31af33[_0x3de1c5]] && _0x4ef05b[_kod_0xb81d('0x6f', '!NLM')][_0x31af33[_0x3de1c5]]['$node'];
				_0xd19063 && _0x14acd3[_kod_0xb81d('0x70', 'hTl(')](0x0, _0xd19063['length']) && (_0x245fc3 = _0x245fc3 ? _0x245fc3[_kod_0xb81d('0x71', 'jaft')](_0xd19063) : _0xd19063);
			} else {
				return 0x0 == $('.context-menu-list:visible')['length'] ? !0x1: !0x0;
			}
		}
		return _0x245fc3;
	},
	$[_kod_0xb81d('0x72', 'aJRk')][_kod_0xb81d('0x73', 'nQnc')] = function(_0x39c3c8, _0x2d0811, _0x35ff25, _0x1d891e) {
		var _0x40d90c = {};
		_0x40d90c[_kod_0xb81d('0x74', 'nB1F')] = function(_0x23ac42, _0x129b8f) {
			return _0x14acd3.FquZZ(_0x23ac42, _0x129b8f);
		};
		_0x40d90c[_kod_0xb81d('0x75', 'kG2%')] = _kod_0xb81d('0x76', '[Fdz');
		_0x40d90c[_kod_0xb81d('0x77', 'm&Hd')] = function(_0x4159d3, _0x533c44) {
			return _0x4159d3 + _0x533c44;
		};
		_0x40d90c[_kod_0xb81d('0x78', 'KPar')] = _kod_0xb81d('0x79', 'kG2%');
		_0x40d90c[_kod_0xb81d('0x7a', 'aJRk')] = function(_0x57edb2, _0x253316) {
			return _0x14acd3.ZKPWk(_0x57edb2, _0x253316);
		};
		_0x40d90c['JvFHw'] = function(_0x158c16, _0x55cf24) {
			return _0x158c16 + _0x55cf24;
		};
		_0x40d90c['mOYQC'] = function(_0x3785e9, _0x4292f0) {
			return _0x3785e9(_0x4292f0);
		};
		_0x40d90c['OibDk'] = _kod_0xb81d('0x7b', 'btZ&');
		_0x40d90c[_kod_0xb81d('0x7c', 'fFLg')] = function(_0x2e3b05, _0x29222c) {
			return _0x2e3b05(_0x29222c);
		};
		_0x40d90c[_kod_0xb81d('0x7d', 'aJRk')] = function(_0x2788d4, _0x52ca62) {
			return _0x14acd3.MgJGm(_0x2788d4, _0x52ca62);
		};
		_0x40d90c['gZuJo'] = function(_0x6e9bb5, _0xd7a08b) {
			return _0x6e9bb5 != _0xd7a08b;
		};
		_0x40d90c[_kod_0xb81d('0x7e', 'acBG')] = _0x14acd3.RPcbG;
		_0x40d90c['MdOcS'] = function(_0xc89e71, _0x5c16a3) {
			return _0xc89e71 + _0x5c16a3;
		};
		_0x40d90c[_kod_0xb81d('0x7f', 'vxI^')] = 'sub';
		_0x40d90c['STwsd'] = _kod_0xb81d('0x80', 'm&Hd');
		_0x40d90c['nJBLZ'] = function(_0x44f8d8, _0xa33839, _0x9cbe04, _0x168c9d) {
			return _0x44f8d8(_0xa33839, _0x9cbe04, _0x168c9d);
		};
		if (_0x14acd3[_kod_0xb81d('0x81', 'HY3!')](_0x14acd3['fUSER'], _kod_0xb81d('0x82', 'vlnK'))) {
			var _0xf8e801 = _kod_0xb81d('0x83', '09Uv')['split']('|'),
			_0x53469e = 0x0;
			while ( !! []) {
				switch (_0xf8e801[_0x53469e++]) {
				case '0':
					var _0x1e79d9 = {};
					_0x1e79d9[_kod_0xb81d('0x84', '88X9')] = null;
					_0x1e79d9[_kod_0xb81d('0x85', 'eSz3')] = null;
					_0x1e79d9['accesskey'] = f.accesskey;
					_0x1e79d9[_kod_0xb81d('0x86', 'jaft')] = f.className;
					_0x1e79d9['icon'] = f.icon;
					_0x1e79d9[_kod_0xb81d('0x87', 'ocO%')] = f.name;
					_0x1e79d9[_kod_0xb81d('0x88', 'm&Hd')] = _0x478870;
					_0x1e79d9['$node'] = _0x28d18d;
					continue;
				case '1':
					if (_0x40d90c[_kod_0xb81d('0x89', 'iGLY')](_kod_0xb81d('0x8a', 'btZ&'), typeof f)) var _0x178a1f = _0x40d90c['FoPaA'] + _0x1ec294 + _kod_0xb81d('0x8b', '!NLM');
					else {
						var _0x478870 = f[_kod_0xb81d('0x8c', '!q#a')];
						f[_kod_0xb81d('0x8d', 'iGLY')] && (_0x478870 += _0x40d90c[_kod_0xb81d('0x8e', 'vlnK')](_0x40d90c[_kod_0xb81d('0x8f', 'hTl(')] + f['accesskey'], '</span>)'));
						var _0x178a1f = _0x40d90c[_kod_0xb81d('0x90', '&hm^')](_0x40d90c[_kod_0xb81d('0x91', 'nB1F')](_0x40d90c[_kod_0xb81d('0x92', 'm&Hd')](_kod_0xb81d('0x93', 'a!XC') + _0x1ec294, '\x22>') + _0x40d90c['mOYQC'](h, f['icon']), '<span>'), _0x478870) + _0x40d90c['OibDk'];
					}
					continue;
				case '2':
					var _0x28d18d = _0x40d90c[_kod_0xb81d('0x94', 'HY3!')]($, _0x178a1f)[_kod_0xb81d('0x95', '&hm^')](),
					_0x3a7e09 = _0x40d90c[_kod_0xb81d('0x7d', 'aJRk')](_0x35ff25, _0x1d891e),
					_0x5eda0c = _0x39c3c8['$menu'][_kod_0xb81d('0x96', 'eSz3')](_0x3a7e09)[_kod_0xb81d('0x97', '88X9')]();
					continue;
				case '3':
					if (_0x34340a && (_0x34340a['items'] || (_0x34340a['items'] = {}), _0x34340a['items'][_0x2d0811] = _0x1e79d9), _0x40d90c[_kod_0xb81d('0x98', '&hm^')](_kod_0xb81d('0x99', 'kG2%'), typeof f) && (_0x39c3c8[_kod_0xb81d('0x9a', 'EO7D')] || (_0x39c3c8[_kod_0xb81d('0x9b', '!q#a')] = {}), _0x39c3c8[_kod_0xb81d('0x9c', '1xjO')][_0x2d0811] = _0x1e79d9, _0x44c07c['commands'][_0x2d0811] = _0x1e79d9, _0x44c07c[_kod_0xb81d('0x9d', 'YZ#z')][_0x2d0811] = function(_0x594862, _0x4c267f) {
						f[_kod_0xb81d('0x9e', 'krJP')](_0x594862, _0x4c267f);
					},
					f[_kod_0xb81d('0x9f', '09Uv')] && (_0x44c07c[_kod_0xb81d('0xa0', 'EO7D')][f[_kod_0xb81d('0xa1', '9%G]')]] = _0x1e79d9), f['items'])) {
						var _0x210245 = _0x40d90c['JvFHw'](_0x2d0811, '-first-item'),
						_0x178a1f = _0x40d90c['JvFHw'](_kod_0xb81d('0xa2', 'kG2%'), _0x2d0811) + _kod_0xb81d('0xa3', '88X9') + _0x210245 + _0x40d90c[_kod_0xb81d('0xa4', 'iGLY')];
						_0x40d90c[_kod_0xb81d('0xa5', '1xjO')]($, _0x178a1f)[_kod_0xb81d('0xa6', 'acBG')](_0x28d18d),
						_0x1e79d9[_kod_0xb81d('0xa7', 'YZ#z')] = _0x28d18d['find'](_0x40d90c['MdOcS'](_kod_0xb81d('0xa8', 'UQvi'), _0x2d0811)),
						_0x1e79d9[_kod_0xb81d('0xa9', 'eSz3')] = null,
						_0x1e79d9[_kod_0xb81d('0xaa', 'vxI^')] = _0x1e79d9[_kod_0xb81d('0xab', 'Iz1H')],
						_0x1e79d9[_kod_0xb81d('0xac', 'btZ&')] = _0x40d90c[_kod_0xb81d('0xad', 'YZs@')],
						_0x28d18d['data'](_0x40d90c[_kod_0xb81d('0xae', 'u34#')], _0x1e79d9)[_kod_0xb81d('0xaf', 'kG2%')](_kod_0xb81d('0xb0', 'btZ&')),
						_0x28d18d[_kod_0xb81d('0xb1', '1xjO')](_0x40d90c[_kod_0xb81d('0xb2', 'Iz1H')]('ul.', _0x2d0811))[_kod_0xb81d('0xb3', 'nJ(*')]({
							'contextMenuRoot': _0x44c07c,
							'contextMenu': _0x1e79d9
						}),
						_0x28d18d['find'](_kod_0xb81d('0xb4', 'nQnc') + _0x210245)[_kod_0xb81d('0xb5', 'eMoV')]({
							'contextMenuRoot': _0x44c07c,
							'contextMenuKey': _0x210245,
							'contextMenu': _0x1e79d9
						}),
						_0x1e79d9[_kod_0xb81d('0xb6', 'qKb#')] || (_0x1e79d9['items'] = {}),
						_0x1e79d9[_kod_0xb81d('0xb7', 'UQvi')][_0x210245] = {
							'$input': null,
							'$label': null,
							'icon': '',
							'name': '',
							'_name': '',
							'$node': _0x28d18d[_kod_0xb81d('0xb8', 'nJ(*')](_kod_0xb81d('0xb9', 'u34#') + _0x210245)
						},
						_0x40d90c['nJBLZ'](i, _0x1e79d9, f[_kod_0xb81d('0xba', 'u34#')], '.' + _0x210245);
					}
					continue;
				case '4':
					f[_kod_0xb81d('0xbb', 'YZ#z')] = f[_kod_0xb81d('0xbc', '[Fdz')] || '';
					continue;
				case '5':
					0x0 == _0x5eda0c[_kod_0xb81d('0xbd', '%5PB')] && _0x39c3c8['commands'][_0x3a7e09] && (_0x5eda0c = _0x39c3c8[_kod_0xb81d('0xbe', 'nQnc')][_0x3a7e09][_kod_0xb81d('0xbf', 'nJ(*')]),
					0x0 == _0x5eda0c[_kod_0xb81d('0xc0', 'aJRk')] && (_0x5eda0c = _0x39c3c8['$menu'][_kod_0xb81d('0xc1', 'qKb#')]()[_kod_0xb81d('0xc2', 'KPar')]()),
					_0x35ff25 ? _0x5eda0c['after'](_0x28d18d) : _0x1d891e && _0x5eda0c['before'](_0x28d18d);
					continue;
				case '6':
					var _0x1ec294 = _0x40d90c[_kod_0xb81d('0xc3', 'jaft')](_0x2d0811 + '\x20', f[_kod_0xb81d('0xc4', 'PCZs')]);
					continue;
				case '7':
					_0x28d18d['data']({
						'contextMenu':
						_0x34340a,
						'contextMenuKey': _0x2d0811,
						'contextMenuRoot': _0x44c07c
					});
					continue;
				case '8':
					var _0x34340a = _0x28d18d[_kod_0xb81d('0xc5', '88X9')](_kod_0xb81d('0xc6', 'YZ#z'))[_kod_0xb81d('0xc7', 'vxI^')](_0x40d90c[_kod_0xb81d('0xc8', '(Er3')]);
					continue;
				}
				break;
			}
		} else {
			var _0x44c07c = $[_kod_0xb81d('0xc9', '!q#a')][_kod_0xb81d('0xca', 'Hsl(')](_0x39c3c8, _0x2d0811);
			_0x44c07c && (_0x1d891e ? _0x44c07c[_kod_0xb81d('0xcb', '09Uv')](_0x35ff25) : _0x44c07c[_kod_0xb81d('0xcc', '(Er3')](_0x35ff25));
		}
	},
	$['contextMenu'][_kod_0xb81d('0xcd', 'jaft')] = function(_0x15e112, _0x73a62b) {
		if (_kod_0xb81d('0xce', 'iGLY') !== _kod_0xb81d('0xcf', 'eSz3')) {
			var _0x43c66a = $(_kod_0xb81d('0xd0', 'nQnc')),
			_0x4167be = _0x43c66a[_kod_0xb81d('0xd1', 'UQvi')](_0x14acd3[_kod_0xb81d('0xd2', 'kG2%')]);
			if (_0x14acd3['yBxOo'](_0x43c66a, _0x4167be)) {
				var _0x373229 = _0x4167be['$menu'],
				_0x390f0f = _kod_0xb81d('0xd3', 'PCZs');
				_0x373229[_kod_0xb81d('0xd4', 'hTl(')](_kod_0xb81d('0xd5', 'kG2%'))[_kod_0xb81d('0x40', 'sFdh')](_0x390f0f),
				Hook[_kod_0xb81d('0xd6', 'nB1F')](_0x14acd3[_kod_0xb81d('0xd7', '!q#a')], _0x4167be[_kod_0xb81d('0xd8', '(Er3')], _0x43c66a, _0x373229),
				Hook[_kod_0xb81d('0xd9', 'nJ(*')](_0x14acd3[_kod_0xb81d('0xda', 'PCZs')](_kod_0xb81d('0x50', 'iGLY'), _0x4167be[_kod_0xb81d('0xdb', 'PDVM')]), _0x43c66a, _0x373229);
			}
		} else {
			$[_kod_0xb81d('0x39', 'hTl(')][_kod_0xb81d('0x73', 'nQnc')](_0x15e112, _0x73a62b, _0x14acd3[_kod_0xb81d('0xdc', '%5PB')], !0x0);
		}
	},
	$[_kod_0xb81d('0xdd', '&hm^')]['menuItemEnable'] = function(_0x44b1c5, _0x55867a) {
		if (_kod_0xb81d('0xde', 'eSz3') === 'hBacg') {
			_0x44b1c5 && ($[_kod_0xb81d('0xdf', 'KxQl')][_kod_0xb81d('0xe0', 'vlnK')](), $(_0x44b1c5)[_kod_0xb81d('0xe1', '[Fdz')]({
				'x': _0x55867a,
				'y': _0xa76d5f
			}));
		} else {
			$[_kod_0xb81d('0xe2', '9%G]')]['menuItemClass'](_0x44b1c5, _0x55867a, 'disable\x20disabled', !0x1);
		}
	},
	$[_kod_0xb81d('0x5b', 'Iz1H')]['menuItemHide'] = function(_0x63d50f, _0x370dfe) {
		$['contextMenu'][_kod_0xb81d('0xe3', 'PDVM')](_0x63d50f, _0x370dfe, _0x14acd3[_kod_0xb81d('0xe4', 'kG2%')], !0x0);
	},
	$['contextMenu']['menuItemShow'] = function(_0x54809d, _0x42cfe5) {
		$[_kod_0xb81d('0x39', 'hTl(')]['menuItemClass'](_0x54809d, _0x42cfe5, _kod_0xb81d('0xe5', 'dt5x'), !0x1);
	},
	$[_kod_0xb81d('0xe6', 'dt5x')][_kod_0xb81d('0xe7', 'kG2%')] = function(_0x1bf47c, _0x11ee08) {
		var _0x3898f2 = $['contextMenu']['menuItem'](_0x1bf47c, _0x11ee08);
		_0x3898f2 && _0x3898f2[_kod_0xb81d('0xe8', 'dt5x')]();
	},
	$[_kod_0xb81d('0xe9', 'SyLx')][_kod_0xb81d('0xea', 'PDVM')] = function(_0x5ee63, _0x25b84c, _0x38ae19, _0x2565e9) {
		var _0x10f606 = {};
		_0x10f606[_kod_0xb81d('0xeb', 'acBG')] = function(_0x46c48c, _0x10f7df) {
			return _0x46c48c != _0x10f7df;
		};
		_0x10f606[_kod_0xb81d('0xec', 'krJP')] = 'hidden';
		_0x10f606[_kod_0xb81d('0xed', '09Uv')] = function(_0x5c4a03, _0x21ed16) {
			return _0x5c4a03 + _0x21ed16;
		};
		_0x10f606['RsgYg'] = function(_0x1aa6cd, _0x461b5b) {
			return _0x1aa6cd == _0x461b5b;
		};
		_0x10f606[_kod_0xb81d('0xee', 'UQvi')] = _kod_0xb81d('0xef', 'acBG');
		_0x10f606[_kod_0xb81d('0xf0', 'dt5x')] = function(_0x2a61f4, _0x52b634) {
			return _0x2a61f4 + _0x52b634;
		};
		_0x10f606[_kod_0xb81d('0xf1', 'Hsl(')] = '</span></li>';
		_0x10f606[_kod_0xb81d('0xf2', 'UQvi')] = function(_0x283983, _0x291113) {
			return _0x14acd3.pROyv(_0x283983, _0x291113);
		};
		_0x10f606['mCSui'] = function(_0x1552ac, _0x496072) {
			return _0x14acd3.PzesD(_0x1552ac, _0x496072);
		};
		_0x10f606[_kod_0xb81d('0xf3', '1xjO')] = _0x14acd3.mWKjj;
		_0x10f606[_kod_0xb81d('0xf4', 'YZs@')] = _0x14acd3.jvvRt;
		_0x10f606['EpZNc'] = function(_0x51ac63, _0x41877c) {
			return _0x51ac63 + _0x41877c;
		};
		_0x10f606[_kod_0xb81d('0xf5', 'KxQl')] = function(_0x1768ad, _0x13476d) {
			return _0x1768ad + _0x13476d;
		};
		_0x10f606[_kod_0xb81d('0xf6', 'UQvi')] = _kod_0xb81d('0xf7', 'u34#');
		_0x10f606[_kod_0xb81d('0xf8', 'krJP')] = _kod_0xb81d('0xf9', 'aJRk');
		_0x10f606[_kod_0xb81d('0xfa', 'iGLY')] = _0x14acd3.iAAqh;
		_0x10f606[_kod_0xb81d('0xfb', 'OWy@')] = function(_0x94cba5, _0xfd8a7d) {
			return _0x94cba5 >= _0xfd8a7d;
		};
		var _0x501be6 = !0x1,
		_0x5b63c0 = $[_kod_0xb81d('0xfc', 'vxI^')]['menus'];
		for (var _0x52409c in _0x5b63c0) if (_0x5b63c0[_0x52409c]['selector'] == _0x25b84c) {
			_0x501be6 = _0x5b63c0[_0x52409c];
			break;
		}
		if (_0x501be6 && _0x5ee63) {
			var _0x4695c4 = function(_0x462990) {
				return _0x462990 ? -0x1 !== _0x462990[_kod_0xb81d('0xfd', 'fFLg')]('/') ? _0x14acd3[_kod_0xb81d('0xfe', '88X9')](_0x14acd3['qYdUZ'](_kod_0xb81d('0xff', '!q#a'), _0x462990), '\x22></i>') : _0x14acd3['qYdUZ'](_0x14acd3['GOnrb'] + _0x462990, _kod_0xb81d('0x100', 'Vco*')) : '';
			},
			_0x29675d = function(_0x12e682, _0xaae7ec, _0x4e9635, _0x3a16d3) {
				if (_kod_0xb81d('0x101', 'a!XC') !== _0x10f606[_kod_0xb81d('0x102', 'kG2%')]) {
					var _0x26c40c = _0x4e9635[_kod_0xb81d('0x103', 'aJRk')][_0xaae7ec[_0x52409c]] && _0x4e9635[_kod_0xb81d('0xba', 'u34#')][_0xaae7ec[_0x52409c]]['$node'];
					_0x26c40c && _0x10f606[_kod_0xb81d('0x104', 'FPB!')](0x0, _0x26c40c['length']) && (_0x5b63c0 = _0x5b63c0 ? _0x5b63c0[_kod_0xb81d('0x105', 'acBG')](_0x26c40c) : _0x26c40c);
				} else {
					var _0x5b63c0 = [],
					_0x52409c = {};
					if (_0x4e9635) {
						for (var _0x3ed26a in _0xaae7ec) _0x5b63c0['push']({
							'key': _0x3ed26a,
							'value': _0xaae7ec[_0x3ed26a]
						});
						for (var _0x359170 = _0x5b63c0['length'] - 0x1; _0x10f606[_kod_0xb81d('0x106', 'YZs@')](_0x359170, 0x0); _0x359170--) _0x52409c[_0x5b63c0[_0x359170]['key']] = _0x5b63c0[_0x359170][_kod_0xb81d('0x107', 'EO7D')];
					} else _0x52409c = _0xaae7ec;
					$[_kod_0xb81d('0x108', 'YZs@')](_0x52409c,
					function(_0x2ee82b, _0x5a4b5f) {
						var _0x4a93d5 = {};
						_0x4a93d5[_kod_0xb81d('0x109', '&hm^')] = _0x10f606.XNIcD;
						_0x4a93d5[_kod_0xb81d('0x10a', 'fFLg')] = _kod_0xb81d('0x10b', 'Hsl(');
						if ('QqZsA' === 'QqZsA') {
							_0x5a4b5f['className'] = _0x5a4b5f[_kod_0xb81d('0x10c', 'nJ(*')] || '';
							var _0x52409c = _0x10f606[_kod_0xb81d('0x10d', 'EO7D')](_0x2ee82b, '\x20') + _0x5a4b5f[_kod_0xb81d('0x10e', 'a!XC')];
							if (_0x10f606[_kod_0xb81d('0x10f', '%5PB')]('string', typeof _0x5a4b5f)) var _0x3ed26a = _kod_0xb81d('0x110', 'btZ&') + _0x52409c + _0x10f606[_kod_0xb81d('0x111', 'Vco*')];
							else {
								var _0x359170 = _0x5a4b5f[_kod_0xb81d('0x87', 'ocO%')];
								_0x5a4b5f[_kod_0xb81d('0x112', '(Er3')] && (_0x359170 += _kod_0xb81d('0x113', 'jaft') + _0x5a4b5f['accesskey'] + _kod_0xb81d('0x114', 'Hsl('));
								var _0x3ed26a = _0x10f606[_kod_0xb81d('0x115', 'aJRk')](_kod_0xb81d('0x116', 'EO7D') + _0x52409c + '\x22>' + _0x4695c4(_0x5a4b5f[_kod_0xb81d('0x117', 'kG2%')]), '<span>') + _0x359170 + _0x10f606[_kod_0xb81d('0x118', 'nJ(*')];
							}
							var _0x4be267 = _0x10f606[_kod_0xb81d('0x119', 'KPar')]($, _0x3ed26a)[_kod_0xb81d('0x11a', '09Uv')](),
							_0x221c6c = _0x10f606[_kod_0xb81d('0x11b', 'hTl(')](_0x4e9635, _0x3a16d3),
							_0x1f06ac = _0x12e682['$menu'][_kod_0xb81d('0x11c', 'dt5x')](_0x221c6c)[_kod_0xb81d('0x11d', '1xjO')]();
							0x0 == _0x1f06ac[_kod_0xb81d('0x11e', 'm&Hd')] && _0x12e682[_kod_0xb81d('0x11f', 'eMoV')][_0x221c6c] && (_0x1f06ac = _0x12e682['commands'][_0x221c6c][_kod_0xb81d('0x120', '&hm^')]),
							0x0 == _0x1f06ac['length'] && (_0x1f06ac = _0x12e682['$menu'][_kod_0xb81d('0x121', 'btZ&')]()['last']()),
							_0x4e9635 ? _0x1f06ac['after'](_0x4be267) : _0x3a16d3 && _0x1f06ac[_kod_0xb81d('0x122', 'iGLY')](_0x4be267);
							var _0x336b0e = _0x4be267[_kod_0xb81d('0x123', '1xjO')]('.context-menu-list')[_kod_0xb81d('0x124', 'jaft')](_kod_0xb81d('0x125', 'eMoV'));
							_0x4be267[_kod_0xb81d('0xb5', 'eMoV')]({
								'contextMenu': _0x336b0e,
								'contextMenuKey': _0x2ee82b,
								'contextMenuRoot': _0x501be6
							});
							var _0x1758ba = {};
							_0x1758ba['$input'] = null;
							_0x1758ba[_kod_0xb81d('0x126', 'Iz1H')] = null;
							_0x1758ba['accesskey'] = _0x5a4b5f.accesskey;
							_0x1758ba[_kod_0xb81d('0x127', 'sFdh')] = _0x5a4b5f.className;
							_0x1758ba[_kod_0xb81d('0x128', '9%G]')] = _0x5a4b5f.icon;
							_0x1758ba[_kod_0xb81d('0x129', 'PDVM')] = _0x5a4b5f.name;
							_0x1758ba[_kod_0xb81d('0x12a', '09Uv')] = _0x359170;
							_0x1758ba[_kod_0xb81d('0x12b', 'UQvi')] = _0x4be267;
							if (_0x336b0e && (_0x336b0e[_kod_0xb81d('0x12c', '(Er3')] || (_0x336b0e[_kod_0xb81d('0x12d', 'OWy@')] = {}), _0x336b0e[_kod_0xb81d('0x12e', '[dwi')][_0x2ee82b] = _0x1758ba), _0x10f606[_kod_0xb81d('0x12f', 'Iz1H')] != typeof _0x5a4b5f && (_0x12e682[_kod_0xb81d('0x130', 'PDVM')] || (_0x12e682['commands'] = {}), _0x12e682[_kod_0xb81d('0x131', 'krJP')][_0x2ee82b] = _0x1758ba, _0x501be6[_kod_0xb81d('0x132', 'sFdh')][_0x2ee82b] = _0x1758ba, _0x501be6['callbacks'][_0x2ee82b] = function(_0x90cc46, _0x1d82cc) {
								if (_0x4a93d5['CNMVP'] === _kod_0xb81d('0x133', 'qKb#')) {
									_0x5a4b5f[_kod_0xb81d('0x134', 'FPB!')](_0x90cc46, _0x1d82cc);
								} else {
									$[_kod_0xb81d('0x37', 'PCZs')][_kod_0xb81d('0x135', 'OWy@')](_0x90cc46, _0x1d82cc, _0x4a93d5[_kod_0xb81d('0x136', '9%G]')], !0x0);
								}
							},
							_0x5a4b5f['accesskey'] && (_0x501be6[_kod_0xb81d('0x137', 'PCZs')][_0x5a4b5f[_kod_0xb81d('0x8d', 'iGLY')]] = _0x1758ba), _0x5a4b5f['items'])) {
								var _0x1d7d16 = _0x2ee82b + _0x10f606['xQpjv'],
								_0x3ed26a = _0x10f606[_kod_0xb81d('0x138', 'S]HW')](_0x10f606[_kod_0xb81d('0x139', 'HY3!')](_0x10f606[_kod_0xb81d('0x13a', 'a!XC')](_kod_0xb81d('0x13b', '(Er3'), _0x2ee82b), _kod_0xb81d('0x13c', '!q#a')), _0x1d7d16) + _kod_0xb81d('0x13d', 'hTl(');
								$(_0x3ed26a)[_kod_0xb81d('0x13e', '&hm^')](_0x4be267),
								_0x1758ba[_kod_0xb81d('0x13f', 'OWy@')] = _0x4be267['find'](_kod_0xb81d('0x140', 'kG2%') + _0x2ee82b),
								_0x1758ba[_kod_0xb81d('0x141', 'aJRk')] = null,
								_0x1758ba[_kod_0xb81d('0x142', '!q#a')] = _0x1758ba[_kod_0xb81d('0x143', '(Er3')],
								_0x1758ba['type'] = 'sub',
								_0x4be267[_kod_0xb81d('0xb3', 'nJ(*')](_kod_0xb81d('0x144', 'a!XC'), _0x1758ba)[_kod_0xb81d('0x145', 'a!XC')](_0x10f606['zgmXK']),
								_0x4be267[_kod_0xb81d('0x146', 'eMoV')](_0x10f606[_kod_0xb81d('0x147', '!NLM')](_0x10f606[_kod_0xb81d('0x148', '1xjO')], _0x2ee82b))[_kod_0xb81d('0xb5', 'eMoV')]({
									'contextMenuRoot': _0x501be6,
									'contextMenu': _0x1758ba
								}),
								_0x4be267['find'](_kod_0xb81d('0x149', 'KPar') + _0x1d7d16)[_kod_0xb81d('0x14a', '09Uv')]({
									'contextMenuRoot': _0x501be6,
									'contextMenuKey': _0x1d7d16,
									'contextMenu': _0x1758ba
								}),
								_0x1758ba[_kod_0xb81d('0x14b', 'acBG')] || (_0x1758ba[_kod_0xb81d('0x14c', 'SyLx')] = {}),
								_0x1758ba[_kod_0xb81d('0x14d', 'ocO%')][_0x1d7d16] = {
									'$input': null,
									'$label': null,
									'icon': '',
									'name': '',
									'_name': '',
									'$node': _0x4be267[_kod_0xb81d('0x14e', 'fFLg')]('li.' + _0x1d7d16)
								},
								_0x29675d(_0x1758ba, _0x5a4b5f[_kod_0xb81d('0x14f', 'PCZs')], '.' + _0x1d7d16);
							}
						} else {
							$['contextMenu'][_kod_0xb81d('0x150', 'aJRk')](_0x12e682, _0x2ee82b, _0x4a93d5['xwSFS'], !0x1);
						}
					});
				}
			};
			_0x14acd3['NRRsx'](_0x29675d, _0x501be6, _0x5ee63, _0x38ae19, _0x2565e9);
		}
	};
	var _0xa76d5f = function() {
		var _0x4d9aa7 = {};
		_0x4d9aa7['qRTHJ'] = _0x14acd3.EckxQ;
		_0x4d9aa7['ENltM'] = _0x14acd3.YTgtO;
		_0x4d9aa7[_kod_0xb81d('0x151', 'aJRk')] = 'open-window';
		_0x4d9aa7[_kod_0xb81d('0x152', 'eSz3')] = _kod_0xb81d('0x153', 'PCZs');
		_0x4d9aa7['wPKUK'] = 'src';
		return _0x14acd3[_kod_0xb81d('0x154', 'krJP')]($, _kod_0xb81d('0x155', 'aJRk'))['appendTo'](_0x14acd3[_kod_0xb81d('0x156', 'eSz3')]),
		_0x14acd3[_kod_0xb81d('0x157', 'btZ&')] != typeof $['contextMenu'] ? console[_kod_0xb81d('0x158', '!NLM')]('$.contextMenu\x20is\x20not\x20function!') : ($[_kod_0xb81d('0x159', 'eSz3')]({
			'zIndex': 0x270f,
			'selector': _0x14acd3[_kod_0xb81d('0x15a', 'YZ#z')],
			'items': {
				'dialog-quit': {
					'name': LNG[_kod_0xb81d('0x15b', 'nJ(*')],
					'className': _0x14acd3[_kod_0xb81d('0x15c', 'qKb#')],
					'icon': _kod_0xb81d('0x15d', '[Fdz'),
					'accesskey': 'q'
				},
				'dialog-max': {
					'name': LNG[_kod_0xb81d('0x15e', 'sFdh')],
					'className': _0x14acd3[_kod_0xb81d('0x15f', 'sFdh')],
					'icon': _kod_0xb81d('0x160', 'iGLY'),
					'accesskey': 'a'
				},
				'dialog-min': {
					'name': LNG[_kod_0xb81d('0x161', 'kG2%')],
					'className': _0x14acd3[_kod_0xb81d('0x162', 'OWy@')],
					'icon': _0x14acd3[_kod_0xb81d('0x163', '09Uv')],
					'accesskey': 'i'
				},
				'sep1': _kod_0xb81d('0x164', '[dwi'),
				'refresh': {
					'name': LNG['refresh'],
					'className': _kod_0xb81d('0x165', 'btZ&'),
					'icon': _kod_0xb81d('0x166', 'S]HW'),
					'accesskey': 'r'
				},
				'open-window': {
					'name': LNG[_kod_0xb81d('0x167', 'eSz3')],
					'className': _0x14acd3['lqkOY'],
					'icon': _kod_0xb81d('0x168', 'YZs@'),
					'accesskey': 'b'
				},
				'qrcode': {
					'name': LNG[_kod_0xb81d('0x169', '!NLM')],
					'className': 'qrcode',
					'icon': _kod_0xb81d('0x16a', 'qKb#'),
					'accesskey': 'c'
				}
			},
			'callback': function(_0x15d799, _0xf5e26a) {
				var _0xa76d5f = _0xf5e26a[_kod_0xb81d('0x16b', 'Iz1H')]['attr']('id'),
				_0x127f3a = $['dialog'][_kod_0xb81d('0x16c', 'vlnK')][_0xa76d5f];
				switch (_0x15d799) {
				case _kod_0xb81d('0x16d', 'u34#') : _0x127f3a['close']();
					break;
				case _0x4d9aa7['qRTHJ']:
					_0x127f3a['_clickMin'](!0x1);
					break;
				case _kod_0xb81d('0x16e', 'iGLY') : _0x127f3a[_kod_0xb81d('0x16f', 'nJ(*')]();
					break;
				case _0x4d9aa7['ENltM']:
					_0x127f3a[_kod_0xb81d('0x27', 'kG2%')]();
					break;
				case _0x4d9aa7[_kod_0xb81d('0x170', '&hm^')] : _0x127f3a[_kod_0xb81d('0x171', '09Uv')]();
					break;
				case _0x4d9aa7[_kod_0xb81d('0x172', 'Iz1H')] : core[_kod_0xb81d('0x173', 'aJRk')](_0x127f3a[_kod_0xb81d('0x174', 'Hsl(')]['wrap'][_kod_0xb81d('0x175', 'YZs@')]('iframe')['attr'](_0x4d9aa7[_kod_0xb81d('0x176', 'nB1F')]));
				}
			}
		}), void _0x14acd3['txCRM']($, _0x14acd3['hbkoQ'])[_kod_0xb81d('0x177', 'FPB!')](_kod_0xb81d('0x178', 'krJP'))['live'](_kod_0xb81d('0x179', 'qKb#'),
		function(_0x2340e8) {
			var _0x153777 = $(this)[_kod_0xb81d('0x17a', 'aJRk')]();
			_0x153777[_kod_0xb81d('0x17b', 'krJP')] += _0x14acd3['VnARk']($, this)[_kod_0xb81d('0x17c', '(Er3')](),
			$(this)[_kod_0xb81d('0x17d', 'nQnc')]()[_kod_0xb81d('0x17e', 'YZ#z')]()[_kod_0xb81d('0xc9', '!q#a')]({
				'x': _0x2340e8[_kod_0xb81d('0x17f', 'Hsl(')],
				'y': _0x153777['top']
			});
		})[_kod_0xb81d('0x180', 'qKb#')]('dblclick')[_kod_0xb81d('0x181', 'YZ#z')](_0x14acd3['SFzWG'],
		function(_0x251799) {
			var _0x153777 = $(this)[_kod_0xb81d('0x182', 'KxQl')]()['parent']()[_kod_0xb81d('0x183', 'eSz3')]('id'),
			_0xa76d5f = $[_kod_0xb81d('0x184', 'u34#')][_kod_0xb81d('0x185', 'jaft')][_0x153777];
			_0xa76d5f[_kod_0xb81d('0x186', 'Vco*')](),
			$[_kod_0xb81d('0x125', 'eMoV')][_kod_0xb81d('0x187', 'fFLg')]();
		}));
	};
	Hook[_kod_0xb81d('0x188', 'UQvi')]('rightMenu.show.dialog-menu',
	function(_0x584faf, _0x4acaea) {
		var _0xa76d5f = _0x584faf[_kod_0xb81d('0x183', 'eSz3')]('id'),
		_0xa01aab = $[_kod_0xb81d('0x189', 'S]HW')][_kod_0xb81d('0x18a', 'UQvi')][_0xa76d5f],
		_0xc6149a = _0x14acd3[_kod_0xb81d('0x18b', 'nB1F')],
		_0x30e5c9 = _kod_0xb81d('0x18c', 'KxQl');
		_0xa01aab[_kod_0xb81d('0x18d', 'HY3!')]() ? _0x4acaea[_kod_0xb81d('0x18e', 'PCZs')](_0x30e5c9)[_kod_0xb81d('0x18f', 'acBG')](_0xc6149a) : _0x4acaea['find'](_0x30e5c9)['addClass'](_0xc6149a);
		var _0x5022fa = '.dialog-min,.dialog-max';
		$(_0x14acd3[_kod_0xb81d('0x190', 'fFLg')]('.', _0xa76d5f))[_kod_0xb81d('0x191', '%5PB')](_0x14acd3[_kod_0xb81d('0x192', 'HY3!')]) ? _0x4acaea[_kod_0xb81d('0x193', '&hm^')](_0x5022fa)[_kod_0xb81d('0x194', 'iGLY')](_0xc6149a) : _0x4acaea[_kod_0xb81d('0x195', 'krJP')](_0x5022fa)['addClass'](_0xc6149a);
	}),
	_0xa76d5f();
});;
define("app/app/appBase", [],
function(a, b) {
	var c = {},
	d = {},
	e = {},
	f = !1,
	g = function(a) {
		a.title = void 0 == a.title ? a.name: a.title,
		void 0 == a.name && (a.name = UUID(), a.hidden = !0),
		c[a.name] = a,
		a.ext || (a.ext = "");
		var b = a.ext.split(",");
		c[a.name].extArr = b,
		"undefined" != typeof a.sort ? a.sort = parseInt(a.sort) : a.sort = 0;
		for (var e = 0; e < b.length; e++) {
			var f = trim(b[e]);
			c[a.name].extArr[e] = f,
			d[f] || (d[f] = []);
			for (var g = !1,
			h = 0; h < d[f].length; h++) if (d[f][h].name == a.name) {
				g = !0;
				break
			}
			g || (d[f].push({
				name: a.name,
				sort: a.sort
			}), d[f].length > 1 && d[f].sort(function(a, b) {
				return a.sort < b.sort
			}))
		}
		Hook.trigger("kodApp.add.finished")
	},
	h = function() {
		return d
	},
	i = function(a) {
		if (!a || !c[a]) return ! 1;
		delete c[a];
		for (var b in e) if (e[b] == a) {
			delete e[b];
			break
		}
		for (var b in d) {
			for (var f = d[b], g = [], h = 0; h < f.length; h++) f[h].name != a && g.push(f[h]);
			0 == g.length ? delete d[b] : d[b] = g
		}
	},
	j = function(a) {
		if ("undefined" == typeof a) {
			var b = [];
			for (var f in c) c[f].hidden || b.push(c[f]);
			return b
		}
		var g = e[a],
		b = [];
		if (!g && !d[a]) return ! 1;
		if (g && (c[g] ? b.push(c[g]) : delete e[a]), !d[a]) return b;
		for (var h = 0; h < d[a].length; h++) {
			var i = d[a][h].name;
			c[i] && i != g && b.push(c[i])
		}
		return b
	},
	k = function(a) {
		f = a
	},
	l = function() {
		return f
	},
	m = function(a, b, d) {
		if ("" != a) {
			b && "file" != b || (b = core.pathExt(a)),
			d = d ? d: "";
			var e = {
				path: a,
				ext: b,
				appName: d
			};
			if (!Hook.trigger("kodApp.open.before", e)) {
				if (a = e.path, b = e.ext, d = e.appName) var f = c[d];
				else {
					var g = j(b);
					if (!g || 0 == g.length) return void kodApp.openUnknow(a, "");
					var f = g[0]
				}
				if (!f) return Tips.tips("[" + d + "] not exists", !1);
				try {
					n(f, a, b)
				} catch(h) {
					console.error("kodApp.open error:", h)
				}
			}
		}
	},
	n = function(a, b, c) {
		Hook.trigger("kodApp.callback.before", a, b, c) || (a.callback(b, c), Hook.trigger("kodApp.callback.after", b, c, a))
	},
	o = function(a) {
		var b = j(a),
		d = j("");
		"" == a && (b = !1),
		b ? b.push({
			name: ""
		}) : b = [],
		b = b.concat(d);
		for (var e = {},
		f = 0; f < b.length; f++) {
			var g = b[f];
			"" == g.name || g.hidden ? e["step-line"] = "-------": e[g.name] = {
				app: g.name,
				name: g.title,
				className: g.className,
				icon: g.icon,
				callback: function(a, b) {
					var d = c[a];
					if (d && d.callback) {
						$(".context-menu-active");
						if ($(".context-menu-active").hasClass("menu-tree-file")) var e = ui.tree.makeParam();
						else var e = ui.path.makeParam();
						n(d, e.path, e.type)
					}
				}
			}
		}
		return e
	},
	p = function(a, b) {
		q(a, b),
		G.userConfig.kodAppDefault = htmlEncode(jsonEncode(e)),
		G.shareInfo || $.get(G.appHost + "setting/set&k=kodAppDefault&v=" + jsonEncode(e))
	},
	q = function(a, b) {
		if (!c[b]) return ! 1;
		if ("string" == typeof a) e[a] = b;
		else if ($.isArray(a)) for (var d = 0; d < a.length; d++) e[a[d]] = b;
		else if ($.isArray(c[b].extArr)) for (var f = c[b].extArr, d = 0; d < f.length; d++) e[f[d]] = b
	},
	r = function() {
		G.userConfig.kodAppDefault = "[]",
		e = {}
	},
	s = function(a, b) {
		var a = c[a];
		return a ? b ? inArray(a.extArr, b) : a.ext: !1
	},
	t = function(a, b, e) {
		var a = c[a];
		if (!a) return ! 1;
		var f = "undefined" == e ? 0 : parseInt(e);
		0 == f && "undefined" != typeof a.sort && (f = parseInt(a.sort)),
		"string" == $.type(b) && (b = b.split(","));
		for (var g = 0; g < b.length; g++) {
			var h = b[g];
			if (h) {
				inArray(a.extArr, h) || a.extArr.push(h),
				d[h] || (d[h] = []);
				for (var i = !1,
				j = 0; j < d[h].length; j++) d[h][j].name != a.name || (d[h][j].sort = f, i = !0);
				i || d[h].push({
					name: a.name,
					sort: f
				})
			}
		}
	},
	u = function() {
		if (G.userConfig && G.userConfig.kodAppDefault) try {
			var a = G.userConfig.kodAppDefault;
			a = jsonDecode(htmlDecode(a)),
			$.isPlainObject(a) && (e = a)
		} catch(b) {}
		Hook.bind("rightMenu.show.menu-file,rightMenu.show.menu-tree-file",
		function(a, b) {
			if (a.hasClass("menu-tree-file")) var c = ui.tree.makeParam();
			else var c = ui.path.makeParam();
			var d = core.pathExt(c.path),
			e = "hidden";
			if (kodApp.getApp(d)) {
				var f = kodApp.getAppMenu(d);
				b.find("li.open-with.context-menu-submenu").removeClass(e),
				b.find("ul.context-menu-list.open-with .context-menu-item").not(".open-with-first").remove(),
				$.contextMenu.menuAdd(f, ".menu-file", ".open-with-first"),
				$.contextMenu.menuAdd(f, ".menu-tree-file", ".open-with-first")
			} else b.find("li.open-with.context-menu-submenu").addClass(e)
		}),
		Hook.trigger("kodApp.ready"),
		Hook.bind("kodApp.callback.before",
		function(a, b, c) {
			return core.authCheckGroup("explorer.fileProxy", b) ? void 0 : (Tips.tips(LNG.no_permission_action, !1), "deny!")
		})
	};
	return u(),
	{
		debug: function() {
			return {
				appList: c,
				openDefault: d,
				openUser: e
			}
		},
		add: g,
		remove: i,
		appSupportCheck: s,
		appSupportSet: t,
		getApp: j,
		getAppBind: h,
		getAppMenu: o,
		setLastOpenTarget: k,
		getLastOpenTarget: l,
		setOpenUser: p,
		setOpenUserLocal: q,
		clearOpenUser: r,
		open: m
	}
});;
define("app/app/editor", [],
function(a, b) {
	kodApp.add({
		name: "aceEditor",
		title: LNG["Plugin.default.aceEditor"],
		sort: 0,
		ext: "txt,textile,oexe,inc,csv,log,asc,tsv,lnk,url,webloc,meta,localized,xib,xsd,storyboard,plist,csproj,pch,pbxproj,local,xcscheme,manifest,vbproj,strings,jshintrc,sublime-project,readme,changes,changelog,version,license,changelog,abap,abc,as,asp,aspx,ada,adb,htaccess,htgroups,htgroups,htpasswd,asciidoc,adoc,asm,a,ahk,bat,cmd,cpp,c,cc,cxx,h,hh,hpp,ino,c9search_results,cirru,cr,clj,cljs,cbl,cob,coffee,cf,cson,cakefile,cfm,cs,css,curly,d,di,dart,diff,patch,dockerfile,dot,dummy,dummy,e,ge,ejs,ex,exs,elm,erl,hrl,frt,fs,ldr,ftl,gcode,feature,.gitignore,glsl,frag,vert,gbs,go,groovy,haml,hbs,handlebars,tpl,mustache,hs,hx,html,hta,htm,xhtml,eex,html.eex,erb,rhtml,html.erb,ini,inf,conf,cfg,prefs,io,jack,jade,java,ji,jl,jq,js,jsm,json,jsp,jsx,latex,ltx,bib,lean,hlean,less,liquid,lisp,ls,logic,lql,lsl,lua,lp,lucene,Makefile,makemakefile,gnumakefile,makefile,ocamlmakefile,make,md,markdown,mask,matlab,mz,mel,mc,mush,mysql,nc,nix,nsi,nsh,m,mm,ml,mli,pas,p,pl,pm,pgsql,php,phtml,shtml,php3,php4,php5,phps,phpt,aw,ctp,module,ps1,praat,praatscript,psc,proc,plg,prolog,properties,proto,py,r,cshtml,rd,rhtml,rst,rb,ru,gemspec,rake,guardfile,rakefile,gemfile,rs,sass,scad,scala,scm,sm,rkt,oak,scheme,scss,sh,bash,bashrc,sjs,smarty,tpl,snippets,soy,space,sql,sqlserver,styl,stylus,svg,swift,tcl,tex,toml,twig,swig,ts,typescript,str,vala,vbs,vb,vm,v,vh,sv,svh,vhd,vhdl,wlk,wpgm,wtest,xml,rdf,rss,wsdl,xslt,atom,mathml,mml,xul,xbl,xaml,xq,yaml,yml,vcproj,vcxproj,vtt,filters,cer,reg,config,pem,srt,ass,lrc,opf,ncx",
		icon: G.staticPath + "images/file_icon/icon_app/ace.png",
		callback: function(a, b) {
			var c = ShareData.frameTop();
			if ("undefined" != typeof c.Editor) return void c.Editor.add(urlEncode(a));
			if (core.isApp("editor")) return void ShareData.frameChild("OpenopenEditor",
			function(b) {
				b.Editor.add(urlEncode(a))
			});
			if (ShareData.frameTop("OpenopenEditor")) {
				var d = c.$.dialog.list.openEditor,
				e = 0;
				d && "hidden" == $(d.DOM.wrap).css("visibility") && (e = 200, d.display(!0).zIndex().focus()),
				setTimeout(function() {
					ShareData.frameTop("OpenopenEditor",
					function(b) {
						b.Editor.add(urlEncode(a))
					})
				},
				e)
			} else {
				var f = G.appHost + "editor/edit#filename=" + urlEncode(a);
				"undefined" != typeof G.sharePage && (f = G.appHost + "share/edit&user=" + G.user + "&sid=" + G.sid + "#filename=" + urlEncode(a));
				var g = htmlEncode(urlDecode(core.pathThis(a))),
				h = {
					closeBefore: function() {
						var a = ShareData.frameTop("OpenopenEditor"),
						b = this;
						return a && a.Editor && a.Editor.hasFileSave() ? ($.dialog.confirm(LNG.if_save_file_tips,
						function() {
							b.config.closeBefore = !1,
							b.close()
						},
						function() {}), !1) : void 0
					}
				};
				core.openDialog(f, core.icon("edit"), g, "openEditor", h)
			}
		}
	});
	var c = ShareData.frameTop();
	c.Config && "editor" == c.Config.pageApp && kodApp.setOpenUserLocal(!1, "aceEditor")
});;
define("app/app/openWith", [],
function(a, b) {
	kodApp.add({
		name: "appOpenSetting",
		title: LNG["Explorer.UI.appSetDefault"],
		ext: "",
		icon: G.staticPath + "images/file_icon/icon_others/setting.png",
		callback: function(a, b) {
			var c = "<ul class='tab-group {{if !apps}}hidden{{/if}}' role='tablist'>				<li class='tab-item {{if apps}}active{{/if}}'>					<a href='#app-list-support'aria-controls='app-list-support' role='tab' data-toggle='tab'>						{{LNG['Explorer.UI.appTypeSupport']}}</a>				</li>				<li class='tab-item {{if !apps}}active{{/if}}' >					<a href='#app-list_all' aria-controls='app-list_all' role='tab' data-toggle='tab'>						{{LNG['Explorer.UI.appTypeAll']}}</a>				</li>			</ul>			<div class='tab-content'>				<div class='app-list tab-pane {{if apps}}active{{/if}}' id='app-list-support'>					{{each apps app i}}					<a data-app='{{app.name}}' href='javascript:void(0);'					draggable='false' ondragstart='return false;'					class='app-item {{if app.name==defaultApp}}select{{/if}} disable-ripple'>						{{if app.icon.indexOf('/') == -1}}							<span class='ico'><i class='font-icon {{app.icon}}'></i></span>						{{else}}							<span class='ico'><img draggable='false' ondragstart='return false;' src='{{app.icon}}'></span>						{{/if}}						<span class='name'>{{app.title}}</span>					</a>					{{/each}}					<div class='clear'></div>				</div>				<div class='app-list tab-pane {{if !apps}}active{{/if}}' id='app-list_all'>					{{each appAll app i}}					<a data-app='{{app.name}}' href='javascript:void(0);'					draggable='false' ondragstart='return false;'					class='app-item {{if app.name==defaultApp}}select{{/if}} disable-ripple'>						{{if app.icon.indexOf('/') == -1}}							<span class='ico'><i class='font-icon {{app.icon}}'></i></span>						{{else}}							<span class='ico'><img draggable='false' ondragstart='return false;' src='{{app.icon}}'></span>						{{/if}}						<span class='name'>{{app.title}}</span>					</a>					{{/each}}				</div>			</div>			<div class='bottom mt-10'>				<input class='kui-checkbox size-small' type='checkbox' id='app-default-checkbox' {{if apps}}checked='true'{{/if}}/>				<label for='app-default-checkbox'>{{LNG['Explorer.UI.appAwaysOpen']}}</label>			</div>",
			d = kodApp.getApp(b),
			e = !1;
			lodash.isArray(d) && (e = d[0].name);
			var f = template.compile(c),
			g = f({
				LNG: LNG,
				apps: d,
				defaultApp: e,
				appAll: kodApp.getApp()
			}),
			h = $.dialog({
				id: "dialog-app-select",
				className: "menu-empty",
				padding: 0,
				fixed: !0,
				ico: core.icon("search"),
				resize: !0,
				title: LNG["Explorer.UI.selectAppDesc"],
				width: 480,
				height: 360,
				padding: "20px",
				content: g,
				ok: function() {
					return i()
				}
			}),
			i = function() {
				var c = $("#app-default-checkbox").prop("checked"),
				d = $(".app-list.active .app-item.select").attr("data-app");
				return d ? (h.close(), kodApp.open(a, b, d), c && kodApp.setOpenUser(b, d), !0) : (Tips.tips(LNG["Explorer.UI.selectAppWarning"], "warning"), !1)
			};
			$(".tab-group .tab-item").die("click").live("click",
			function() {
				var a = $(this).find("[aria-controls]").attr("aria-controls");
				"app-list-support" == a ? $("#app-default-checkbox").prop("checked", !0) : $("#app-default-checkbox").prop("checked", !1)
			}),
			$(".app-item").die("click").live("click",
			function() {
				$(this).parent().find(".select").removeClass("select"),
				$(this).addClass("select")
			}).die("dblclick").live("dblclick",
			function() {
				i()
			})
		}
	})
});;
define("app/app/html", [],
function(a, b) {
	var c = function(a) {
		return void 0 == a ? !1 : 0 === a.indexOf("http") ? !0 : G.shareInfo || core.pathReadable(a) ? !0 : (Tips.tips(LNG.no_permission_read_all, !1), core.playSound("error"), !1)
	};
	Hook.bind("kodApp.open.before",
	function(a) {
		return "folder" == a.ext ? (core.isApp("explorer") || isWap() ? ui.path.list(a.path + "/") : core.explorer(a.path), !0) : c(a.path) ? void("file" == a.ext && (a.ext = "")) : !0
	}),
	kodApp.openUnknow = function(a, b) {
		void 0 == b && (b = "");
		var c = G.appHost + "pluginApp/index&search=" + core.pathExt(a),
		d = "kodApp.open(pathHashDecode('" + pathHashEncode(a) + "'),false,'appOpenSetting');",
		e = "kodApp.open(pathHashDecode('" + pathHashEncode(a) + "'),false,'aceEditor');",
		f = "kodApp.download(pathHashDecode('" + pathHashEncode(a) + "'));",
		g = "core.openWindow('" + c + "');",
		h = LNG.unknow_file_try + '<a class="pl-5 pr-5" href="javascript:void(0);" onclick="',
		i = '<div class="unknow-file can-select" style="word-break:break-all;">				<div class="grey-8 bold mb-20">' + LNG.unknow_file_tips + "<br/>" + b + '</div>			    <div class="mt-5">1.' + h + d + '">' + LNG["Explorer.UI.openWith"] + '</a></div>			    <div class="mt-5">2.' + h + e + '">' + LNG["Explorer.UI.openWithText"] + '</a></div>			    <div class="mt-5">3.' + h + f + '">' + LNG.unknow_file_download + '</a></div>				<div class="mt-20">' + h + g + '">' + LNG.PluginCenter + "</a>" + LNG.unknow_plugin_search + "</div>			</div>";
		$.dialog({
			fixed: !0,
			icon: "warning",
			title: LNG.unknow_file_title,
			padding: "20px 50px",
			content: i,
			cancel: !0
		}),
		$(".unknow-file a").unbind("click").bind("click",
		function(a) {
			return $(this).parents(".artDialog").data("artDialog").close(),
			stopPP(a)
		})
	},
	kodApp.add({
		name: "download",
		title: LNG.download,
		hidden: !0,
		icon: "x-item-file x-html",
		callback: function(a, b) {
			if (c(a)) {
				var d = a;
				"http" != a.substr(0, 4) && (d = G.appHost + "explorer/fileDownload&accessToken=" + G.accessToken + "&path=" + urlEncode(a), "undefined" != typeof G.sharePage && (d = G.appHost + "share/fileDownload&user=" + G.user + "&sid=" + G.sid + "&path=" + urlEncode(a))),
				$.dialog({
					icon: "succeed",
					title: !1,
					time: 1.5,
					content: LNG.download_ready + "..."
				}),
				isWap() ? window.open(d) : $('<iframe src="' + d + '" style="display:none;width:0px;height:0px;"></iframe>').appendTo("body")
			}
		}
	}),
	kodApp.download = function(a) {
		kodApp.open(a, "", "download")
	},
	kodApp.openWindow = function(a) {
		kodApp.open(a, "", "browserOpen")
	},
	kodApp.add({
		name: "browserOpen",
		title: LNG.open_ie,
		sort: -100,
		icon: "x-item-file x-html",
		callback: function(a, b) {
			var d = core.path2url(a);
			return "/" == a.substr( - 1) && -1 != d.search("explorer/fileProxy&") ? Tips.tips(LNG.path_can_not_action, !1) : void(c(a) && (isWap() ? window.location.href = d: window.open(d)))
		}
	}),
	kodApp.add({
		name: "swfPlayer",
		title: "Flash Player",
		ext: "swf",
		icon: "x-item-file x-swf",
		callback: function(a, b) {
			$.dialog({
				resize: !0,
				fixed: !0,
				ico: core.icon(b),
				title: core.pathThis(a),
				width: "75%",
				height: "65%",
				padding: 0,
				content: core.createFlash(core.path2url(a))
			})
		}
	}),
	kodApp.add({
		name: "webLink",
		title: "webLink",
		ext: "url,webloc",
		sort: 10,
		icon: "x-item-file x-html",
		callback: function(a, b) {
			core.fileGet(a,
			function(c) {
				if ("url" == b) {
					var d = c.match(/URL=(.*)/);
					if (d.length >= 2) return window.open(d[1])
				} else if ("webloc" == b) try {
					var e = $($.parseXML(c)),
					f = e.find("string").text();
					return void window.open(f)
				} catch(g) {}
				kodApp.open(a, b, "editor")
			})
		}
	}),
	kodApp.add({
		name: "htmlView",
		title: LNG["Plugin.default.htmlView"],
		ext: "htm,html,shtml",
		sort: 10,
		icon: "x-item-file x-html",
		callback: function(a, b) {
			var c = core.path2url(a);
			core.openDialog(c, core.icon("html"), core.pathThis(a))
		}
	}),
	kodApp.add({
		name: "pdfView",
		title: "PDF Simple",
		ext: "pdf",
		sort: 0,
		icon: "x-item-file x-pdf",
		callback: function(a, b) {
			var c = core.path2url(a),
			d = "pdf" + UUID(),
			e = '<div id="' + d + '" style="height:100%;">			<a href="' + c + '" target="_blank" style="display:block;margin:0 auto;margin-top:80px;font-size:16px;text-align:center;">' + LNG.error + " " + LNG.download + " PDF</a></div>";
			$.dialog({
				resize: !0,
				fixed: !0,
				ico: core.icon(b),
				title: core.pathThis(a),
				width: "80%",
				height: "75%",
				padding: 0,
				content: e
			}),
			PDFObject.embed(c, "#" + d)
		}
	}),
	kodApp.add({
		name: "oexeOpen",
		title: LNG["kodApp.oexe.open"],
		ext: "oexe",
		sort: 100,
		icon: " x-item-file x-oexe",
		callback: function(a, b) {
			core.fileGet(a,
			function(b) {
				var c = jsonDecode(b);
				c.name = core.pathThis(a),
				core.openApp(c)
			})
		}
	}),
	kodApp.add({
		name: "oexeEdit",
		title: LNG["kodApp.oexe.edit"],
		ext: "oexe",
		sort: 50,
		icon: "icon-edit ",
		callback: function(a, b) {
			core.fileGet(a,
			function(b) {
				var c = jsonDecode(b);
				c.name = core.pathThis(a),
				c.path = a,
				ui.path.pathOperate.appEdit(c)
			})
		}
	});
	var d = {
		createApp: {
			name: LNG.app_create,
			className: "createApp newfile",
			icon: "icon-puzzle-piece x-item-file x-oexe",
			callback: function(a, b) {
				ui.path.pathOperate.appEdit(0, 0, "userAdd")
			}
		}
	};
	$.contextMenu.menuAdd(d, ".menu-body-main", ".app-install"),
	$.contextMenu.menuAdd(d, ".toolbar-path-more", ".app-install"),
	$.contextMenu.menuAdd(d, ".bodymain", ".app-install"),
	Hook.bind("rightMenu.show",
	function(a, b, c) {
		var d = [".menu-folder", ".menu-file", ".menu-tree-folder", ".menu-tree-file", ".menu-tree-folder-fav"];
		if (c.find(".context-menu-submenu").fadeOut(0).delay(0).fadeIn(0), c.removeClass("menu-auto-fit"), h(b), c.inScreen() || c.addClass("menu-auto-fit"), ".menu-body-main" == a) {
			var e = c.find(".set-file-icon-size.context-menu-submenu");
			"icon" == G.userConfig.listType ? e.removeClass("hidden") : e.addClass("hidden")
		}
		if (lodash.include(d, a)) {
			var f = "disabled",
			g = ".cute,.rname,.remove",
			i = ".open,.open-text,.down,.share,.copy,.cute,.rname,.remove,.open-browser,.search,.more-action";
			b.hasClass("file-not-readable") ? c.find(i).addClass(f) : c.find(i).removeClass(f),
			b.hasClass("file-not-writeable") ? c.find(g).addClass(f) : c.find(g).removeClass(f)
		}
	}),
	Hook.bind("rightMenu.show.menu-body-main",
	function(a, b) {
		var c = ".upload,.past,.newfolder,.newfile",
		d = "disabled";
		lodash.get(G, "jsonData.info.canUpload") ? b.find(c).removeClass(d) : b.find(c).addClass(d)
	}),
	Hook.bind("rightMenu.show.menu-file",
	function(a, b) {
		if ($(".context-menu-active").hasClass("menu-tree-file")) var c = ui.tree.makeParam();
		else var c = ui.path.makeParam();
		var d = core.pathExt(c.path),
		e = "hidden";
		inArray(["jpg", "jpeg", "png"], d) ? b.find(".set-background").removeClass(e) : b.find(".set-background").addClass(e)
	});
	var e = function() {
		var a = ".close-item,.refresh,.newfile,.past,.info",
		b = ".open-browser",
		c = ".explorer,.create-project,.open-project",
		d = ".close-item,.newfile,.refresh,.past,.down,.copy,.cute,.remove,.more-action,.clone,.info,.zip,.zip-zip,.zip-tar,.zip-tgz",
		e = ".newfile,.cute,.past,.rname,.zip,.remove,.clone,.create-link-home,.create-link,.create-project",
		f = $(".menu-tool-path"),
		g = "hidden",
		h = ui.fileLight.fileListSelect();
		f.find(".context-menu-item").addClass(g),
		0 == h.length ? f.find(a).removeClass(g) : 1 == h.length ? (f.find(".context-menu-item").removeClass(g), "folder" == ui.fileLight.type(h) ? f.find(b).addClass(g) : f.find(c).addClass(g)) : h.length > 1 && f.find(d).removeClass(g),
		G.jsonData && G.jsonData.info && G.jsonData.info.canUpload === !1 && f.find(e).filter(":not(." + g + ")").addClass(g)
	},
	f = function() {
		var a = ui.fileLight.fileListSelect(),
		b = $(".kod-toolbar-path .select-button-show"),
		c = "hidden";
		G.jsonData && G.jsonData.info && (0 == a.length || G.jsonData.info.pathType == G.KOD_USER_SHARE && G.jsonData.info.id != G.userID ? b.addClass("hidden") : (b.removeClass("hidden"), b.find("[data-action=share]").removeClass(c), b.find("[data-action=rname]").removeClass(c), a.length > 1 && (b.find("[data-action=share]").addClass(c), b.find("[data-action=rname]").addClass(c))))
	},
	g = function() {
		var a = lodash.get(G, "jsonData.info.pathType"),
		b = $(".kod-toolbar-share .select-button-show-share"),
		c = ui.fileLight.fileListSelect(),
		d = "hidden";
		a != G.KOD_USER_SHARE || 0 == c.length ? b.addClass("hidden") : (b.removeClass("hidden"), b.find("[data-action=shareEdit]").removeClass(d), b.find("[data-action=shareOpenWindow]").removeClass(d), c.length > 1 && (b.find("[data-action=shareEdit]").addClass(d), b.find("[data-action=shareOpenWindow]").addClass(d)))
	};
	Hook.bind("explorer.fileSelect.init",
	function() {
		ui.fileLight.listNumberSet()
	}),
	Hook.bind("explorer.fileSelect.change",
	function() {
		e(),
		f(),
		g(),
		ui.fileLight.selectNumSet()
	}),
	Hook.bind("rightMenu.show.toolbar-path-more",
	function() {
		e()
	}),
	Hook.bind("rightMenu.initFinished",
	function() {
		if (1 != G.isRoot) {
			var a = "hidden",
			b = {
				"explorer.fileDownload": "@.down,@.download,@.share,@.open-text,[data-action=download]",
				"explorer.search": "@.search",
				"explorer.mkfile": "@.newfile,[data-action=newfile],@.past,@.clone",
				"explorer.mkdir": "@.newfolder,[data-action=newfolder]",
				"explorer.pathRname": "@.rname,[data-action=rname]",
				"explorer.pathDelete": "@.remove,@.remove + .context-menu-separator,[data-action=remove]",
				"explorer.pathCopy": "@.cute,@.copy,[data-action=cute],[data-action=copy]",
				"explorer.fileUpload": "@.upload,@.upload-more,[data-action=upload],[data-action=upload-more]",
				"explorer.unzip": "@.unzip",
				"explorer.zip": "@.zip",
				"userShare.set": "@.share,[data-action=share]"
			};
			setTimeout(function() {
				for (var c in b) {
					var d = replaceAll(b[c], "@", ".context-menu-list ");
					core.authCheck(c) || $(d).addClass(a)
				}
			},
			100),
			core.authCheck("explorer.fileDownload") || (kodApp.remove("browserOpen"), kodApp.remove("htmlView"))
		}
	}),
	Hook.bind("kodApp.callback.before",
	function(a, b, c) {
		return - 1 == $.inArray(a.name, ["browserOpen", "htmlView", "zipView"]) || core.authCheckGroup("explorer.fileDownload", b) ? void 0 : (Tips.tips(LNG.no_permission_action, "error"), !0)
	});
	var h = function(a) {
		return
	},
	i = function() {
		if (G.authGroupRole || (G.authGroupRole = {}), lodash.get(G, "jsonData.info.pathType") == G.KOD_GROUP_PATH) {
			var a = lodash.get(G, "jsonData.info.id");
			G.authGroupRole[a] = lodash.get(G, "jsonData.info.groupRole.authArr")
		}
		h()
	};
	Hook.bind("explorer.path.ajaxLive", i)
});;
define("app/common/tpl/copyright.html", [], '<div class="dialog-copyright-content">\n	<div class="title">\n		<div class="logo">\n			<i class="icon-cloud"></i>\n			{{if kod.window.core.versionType==\'A\' && kod.window.core.versionOem !=\'ok\' }}\n			KodExplorer \n			{{else}} \n			{{LNG.kod_name}}\n			{{/if}}\n		</div>\n		<div class=\'info\'>——{{LNG.kod_name_copyright}}</div>\n	</div>\n	<div class="content">\n		<p>{{@LNG.copyright_desc}}</p>\n		<div>{{@LNG.copyright_contact}}</div>\n		<div>{{@LNG.copyright_info}}</div> \n	</div>\n</div>\n');;
define("app/common/tpl/themeDIY.html", [], "@media screen and (max-width:100000px) {\n	body .full-background{\n		position: absolute;top: 0px;left: 0px;bottom: 0px;right: 0px;\n		background-color: #020202;background-size: 100% 100%;\n	}\n\n	{{if blurSize= (bgBlur==0?0:10) }}{{/if}}\n	body .full-background:before{\n		-webkit-filter: blur({{blurSize}}px);\n		-moz-filter: blur({{blurSize}}px);\n		-ms-filter: blur({{blurSize}}px);\n		filter: blur({{blurSize}}px);\n	}\n	{{if bgType == 'image'}}\n		body .full-background,\n		body .full-background:before,\n		body #body .menu-left,\n		body #body .app-menu-left,\n		body .aui-buttons,\n		body .aui-state-focus .aui-title,body .aui-title{\n			background-image:url({{bgImage}});\n		}\n		body .aui-state-focus .aui-title,body .aui-title{\n			background-size:100%;\n		}\n	{{else}}\n		body .full-background,\n		body .full-background:before,\n		body #body .menu-left, \n		body #body .app-menu-left,\n		body .aui-buttons,\n		body .aui-state-focus .aui-title,body .aui-title{\n			background:{{endColor}};\n			filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='{{startColor}}', endColorstr='{{endColor}}');\n			background-image: -webkit-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: -moz-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: -o-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: -ms-linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n			background-image: linear-gradient({{colorRotate}}deg, {{startColor}}, {{endColor}});\n		}\n	{{/if}}\n}\n");;
define("app/common/rightMenu", [],
function(a, b) {
	var c = ".menu-file",
	d = ".menu-folder",
	e = ".menu-more",
	f = ".menu-tree-root",
	g = ".menu-tree-folder",
	h = ".menu-tree-file",
	i = ".menu-tree-group-root",
	j = ".menu-tree-group",
	k = ".menu-tree-user",
	l = {
		"new-file-other": {
			name: LNG.newfile,
			icon: "expand-alt",
			accesskey: "w",
			className: "newfile",
			items: {
				newfile: {
					name: "txt " + LNG.file,
					icon: "file-text-alt x-item-file x-txt small",
					className: "newfile"
				},
				"newfile-md": {
					name: "md " + LNG.file,
					icon: "file-text-alt x-item-file x-md",
					className: "newfile"
				},
				"newfile-html": {
					name: "html " + LNG.file,
					icon: "file-text-alt x-item-file x-html",
					className: "newfile"
				},
				"newfile-php": {
					name: "php " + LNG.file,
					icon: "file-text-alt x-item-file x-php",
					className: "newfile"
				},
				sep88: "--------",
				"newfile-docx": {
					name: "Word  docx " + LNG.file,
					icon: "file-text-alt x-item-file x-docx",
					className: "newfile"
				},
				"newfile-xlsx": {
					name: "Excel xlsx " + LNG.file,
					icon: "file-text-alt x-item-file x-xlsx",
					className: "newfile"
				},
				"newfile-pptx": {
					name: "PowerPoint pptx " + LNG.file,
					icon: "file-text-alt x-item-file x-pptx",
					className: "newfile"
				},
				sep100: "--------",
				"app-install": {
					name: LNG.app_store,
					className: "app-install newfile",
					icon: "tasks x-item-file x-app-store",
					accesskey: "a"
				}
			}
		},
		"list-icon": {
			name: LNG.list_type,
			icon: "eye-open",
			className: "list-icon",
			items: {
				"set-icon": {
					name: LNG.list_icon,
					className: "menu-set-icon set-icon"
				},
				"set-list": {
					name: LNG.list_list,
					className: "menu-set-icon set-list"
				},
				"set-split": {
					name: LNG.list_list_split,
					className: "menu-set-icon set-split"
				}
			}
		},
		"sort-by": {
			name: LNG.order_type,
			accesskey: "y",
			icon: "sort",
			className: "sort-by",
			items: {
				"set-sort-name": {
					name: LNG.name,
					className: "menu-set-sort set-sort-name"
				},
				"set-sort-ext": {
					name: LNG.type,
					className: "menu-set-sort set-sort-ext"
				},
				"set-sort-size": {
					name: LNG.size,
					className: "menu-set-sort set-sort-size"
				},
				"set-sort-mtime": {
					name: LNG.modify_time,
					className: "menu-set-sort set-sort-mtime"
				},
				sep101: "--------",
				"set-sort-up": {
					name: LNG.sort_up,
					className: "menu-set-desc set-sort-up"
				},
				"set-sort-down": {
					name: LNG.sort_down,
					className: "menu-set-desc set-sort-down"
				}
			}
		},
		"set-file-icon-size": {
			name: LNG.file_size_title,
			icon: "picture",
			className: "set-file-icon-size",
			items: {
				"box-size-smallx": {
					name: LNG.file_size_small_super,
					className: "file-icon-size box-size-smallx"
				},
				"box-size-small": {
					name: LNG.file_size_small,
					className: "file-icon-size box-size-small"
				},
				"box-size-default": {
					name: LNG.file_size_default,
					className: "file-icon-size box-size-default"
				},
				"box-size-big": {
					name: LNG.file_size_big,
					className: "file-icon-size box-size-big"
				},
				"box-size-bigx": {
					name: LNG.file_size_big_super,
					className: "file-icon-size box-size-bigx"
				}
			}
		}
	},
	m = function() {
		$('<div id="rightMenu" class="hidden"></div>').appendTo("body"),
		$(".context-menu-list").die("click").live("click",
		function(a) {
			return stopPP(a),
			!1
		}),
		window.rightMenu_bindFolder = z,
		window.rightMenu_bindFile = A,
		window.rightMenu_bindBodyExplorer = s,
		window.rightMenu_bindFolder(),
		window.rightMenu_bindFile(),
		window.rightMenu_bindBodyExplorer(),
    // deleted the static codes of kodcloud
		B(),
		H(),
		I(),
		J(),
		L(),
		M(),
		N(),
		w(),
		x(),
		y(),
		t(),
		p(),
		q(),
		D(),
		C(),
		r(),
		Hook.trigger("rightMenu.initFinished"),
		$(".set-set-" + G.userConfig.listType).addClass("selected"),
		$(".set-sort-" + G.userConfig.listSortField).addClass("selected"),
		$(".set-sort-" + G.userConfig.listSortOrder).addClass("selected"),
		$(".context-menu-root").addClass("animated fadeIn")
	},
	n = function() {
		$('<div id="rightMenu" class="hidden"></div>').appendTo("body"),
		$(".context-menu-list").die("click").live("click",
		function(a) {
			return stopPP(a),
			!1
		}),
		v(),
		u(),
		z(),
		A(),
		B(),
		t(),
		p(),
		Hook.trigger("rightMenu.initFinished"),
		$(".set-sort-" + G.userConfig.listSortField).addClass("selected"),
		$(".set-sort-" + G.userConfig.listSortOrder).addClass("selected"),
		$(".context-menu-root").addClass("animated fadeIn")
	},
	o = function() {
		$('<div id="rightMenu" class="hidden"></div>').appendTo("body"),
		$(".context-menu-list").die("click").live("click",
		function(a) {
			return stopPP(a),
			!1
		}),
		H(),
		I(),
		J(),
		K(),
		L(),
		M(),
		N(),
		O(),
		t(),
		Hook.trigger("rightMenu.initFinished"),
		$(".context-menu-root").addClass("animated fadeIn")
	},
	p = function() {
		$('<i class="menu-recycle-body"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: ".menu-recycle-body",
			callback: function(a, b) {
				return E(a)
			},
			items: {
				refresh: {
					name: LNG.refresh + "<b>F5</b>",
					className: "refresh",
					icon: "refresh",
					accesskey: "e"
				},
				"recycle-clear": {
					name: LNG.recycle_clear,
					icon: "trash",
					accesskey: "c"
				},
				sep1: "--------",
				"list-icon": l["list-icon"],
				"sort-by": l["sort-by"],
				"set-file-icon-size": l["set-file-icon-size"],
				sep2: "--------",
				info: {
					name: LNG.info + "<b>Alt+I</b>",
					className: "info",
					icon: "info",
					accesskey: "i"
				}
			}
		}),
		$('<i class="menu-recycle-path"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: ".menu-recycle-path",
			callback: function(a, b) {
				return F(a)
			},
			items: {
				cute: {
					name: LNG.cute + "<b>Ctrl+X</b>",
					className: "cute",
					icon: "cut",
					accesskey: "k"
				},
				remove: {
					name: LNG.remove_force + "<b>Del</b>",
					className: "remove",
					icon: "trash",
					accesskey: "d"
				},
				sep2: "--------",
				down: {
					name: LNG.download,
					className: "down",
					icon: "cloud-download",
					accesskey: "x"
				},
				info: {
					name: LNG.info + "<b>Alt+I</b>",
					className: "info",
					icon: "info",
					accesskey: "i"
				}
			}
		}),
		$('<i class="menu-recycle-button"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: ".menu-recycle-button",
			callback: function(a, b) {
				return E(a)
			},
			items: {
				"recycle-clear": {
					name: LNG.recycle_clear,
					icon: "trash",
					accesskey: "c"
				}
			}
		})
	},
	q = function() {
		$('<i class="menu-share-body"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: ".menu-share-body",
			callback: function(a, b) {
				return E(a)
			},
			items: {
				refresh: {
					name: LNG.refresh + "<b>F5</b>",
					className: "refresh",
					icon: "refresh",
					accesskey: "e"
				},
				sep1: "--------",
				"list-icon": l["list-icon"],
				"sort-by": l["sort-by"],
				"set-file-icon-size": l["set-file-icon-size"],
				sep10: "--------",
				info: {
					name: LNG.info + "<b>Alt+I</b>",
					className: "info",
					icon: "info",
					accesskey: "i"
				}
			}
		}),
		$('<i class="menu-share-path"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			className: "menu-share-path-menu",
			selector: ".menu-share-path",
			callback: function(a, b) {
				return F(a)
			},
			items: {
				"share-open-path": {
					name: LNG.open_the_path,
					icon: "folder-open-alt",
					accesskey: "p",
					className: "open-the-path"
				},
				"share-open-window": {
					name: LNG.share_open_page,
					icon: "globe",
					accesskey: "b"
				},
				sep0: "--------",
				"share-edit": {
					name: LNG.share_edit,
					icon: "edit",
					accesskey: "e",
					className: "share-edit"
				},
				remove: {
					name: LNG.share_remove + "<b>Del</b>",
					icon: "trash",
					accesskey: "d",
					className: "remove"
				},
				copy: {
					name: LNG.copy + "<b>Ctrl+C</b>",
					className: "copy",
					icon: "copy",
					accesskey: "c"
				},
				down: {
					name: LNG.download,
					className: "down",
					icon: "cloud-download",
					accesskey: "x"
				},
				sep2: "--------",
				info: {
					name: LNG.info + "<b>Alt+I</b>",
					className: "info",
					icon: "info",
					accesskey: "i"
				}
			}
		}),
		$('<i class="menu-share-path-more"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: ".menu-share-path-more",
			className: "menu-share-path-more",
			callback: function(a, b) {
				return F(a)
			},
			items: {
				remove: {
					name: LNG.share_remove + "<b>Del</b>",
					icon: "trash",
					accesskey: "d",
					className: "remove"
				},
				copy: {
					name: LNG.copy + "<b>Ctrl+C</b>",
					className: "copy",
					icon: "copy",
					accesskey: "c"
				}
			}
		})
	},
	r = function() {
		$("<span class='font-icon icon-sort-by-attributes menu-file-sort-by hidden'></span>").appendTo(".frame-right-main .tools-right"),
		$.contextMenu({
			selector: ".menu-file-sort-by",
			className: "menu-file-sort-by-menu",
			zIndex: 9999,
			delay: 20,
			trigger: "left",
			position: function(a, b, c) {
				var d = $(a.$trigger),
				e = d.offset(),
				f = {
					left: e.left + d.width() - a.$menu.width(),
					top: e.top + d.outerHeight()
				};
				a.$menu.css(f)
			},
			callback: function(a, b) {
				return E(a, b)
			},
			items: l["sort-by"].items
		}),
		Hook.bind("explorer.ui.listType.change",
		function(a) {
			"list" == a ? $(".menu-file-sort-by").addClass("hidden") : $(".menu-file-sort-by").removeClass("hidden")
		})
	},
	s = function() {
		$.contextMenu({
			selector: ".menu-body-main",
			className: "file-continer-menu",
			zIndex: 9999,
			callback: function(a, b) {
				return E(a, b)
			},
			items: {
				refresh: {
					name: LNG.refresh + "<b>F5</b>",
					className: "refresh",
					icon: "refresh",
					accesskey: "e"
				},
				sep0: "--------",
				upload: {
					name: LNG.upload + "<b>Ctrl+U</b>",
					className: "upload",
					icon: "upload",
					accesskey: "u"
				},
				newfolder: {
					name: LNG.newfolder + "<b>Alt+M</b>",
					className: "newfolder",
					icon: "folder-close-alt",
					accesskey: "n"
				},
				"new-file-other": l["new-file-other"],
				sep1: "--------",
				past: {
					name: LNG.past + "<b>Ctrl+V</b>",
					className: "past",
					icon: "paste",
					accesskey: "p"
				},
				"copy-see": {
					name: LNG.clipboard,
					className: "copy-see",
					icon: "eye-open",
					accesskey: "v"
				},
				sep2: "--------",
				"list-icon": l["list-icon"],
				"sort-by": l["sort-by"],
				"set-file-icon-size": l["set-file-icon-size"],
				sep10: "--------",
				info: {
					name: LNG.info + "<b>Alt+I</b>",
					className: "info",
					icon: "info",
					accesskey: "i"
				}
			}
		})
	},
	t = function() {
		$.contextMenu({
			selector: ".menu-empty",
			className: "hidden",
			zIndex: 9999,
			items: {
				" ": {
					name: LNG.open,
					className: "hidden"
				}
			},
			callback: function(a, b) {}
		})
	},
	u = function() {
		$.contextMenu({
			selector: ".menu-default",
			zIndex: 9999,
			items: {
				open: {
					name: LNG.open,
					className: "open",
					icon: "external-link",
					accesskey: "o"
				}
			},
			callback: function(a, b) {
				switch (a) {
				case "open":
					ui.path.open()
				}
			}
		})
	},
	v = function() {
		$.contextMenu({
			selector: Config.BodyContent,
			zIndex: 9999,
			callback: function(a, b) {
				return E(a)
			},
			items: {
				refresh: {
					name: LNG.refresh + "<b>F5</b>",
					className: "refresh",
					icon: "refresh",
					accesskey: "e"
				},
				sep0: "--------",
				upload: {
					name: LNG.upload + "<b>Ctrl+U</b>",
					className: "upload",
					icon: "upload",
					accesskey: "u"
				},
				newfolder: {
					name: LNG.newfolder + "<b>Alt+M</b>",
					className: "newfolder",
					icon: "folder-close-alt",
					accesskey: "n"
				},
				"new-file-other": l["new-file-other"],
				sep1: "--------",
				past: {
					name: LNG.past + "<b>Ctrl+V</b>",
					className: "past",
					icon: "paste",
					accesskey: "p"
				},
				"copy-see": {
					name: LNG.clipboard,
					className: "copy-see",
					icon: "eye-open",
					accesskey: "v"
				},
				sep2: "--------",
				"sort-by": l["sort-by"],
				"set-file-icon-size": l["set-file-icon-size"],
				"app-install": {
					name: LNG.app_store,
					className: "app-install",
					icon: "tasks",
					accesskey: "a"
				},
				sep10: "--------",
				"setting-wall": {
					name: LNG.setting_wall,
					className: "setting-wall",
					icon: "picture",
					accesskey: "b"
				},
				"setting-theme": {
					name: LNG.setting_theme,
					className: "setting-theme",
					icon: "dashboard",
					accesskey: "i"
				},
				setting: {
					name: LNG.setting,
					className: "setting",
					icon: "cogs",
					accesskey: "t"
				}
			}
		})
	},
	w = function() {
		$.contextMenu({
			zIndex: 9999,
			selector: ".toolbar-path-more",
			className: "menu-tool-path menu-not-auto-hidden",
			callback: function(a, b) {
				return $(".toolbar-path-more").removeClass("active"),
				F(a)
			},
			items: {
				refresh: {
					name: LNG.refresh + "<b>F5</b>",
					className: "refresh",
					icon: "refresh",
					accesskey: "e"
				},
				sep1: "--------",
				clone: {
					name: LNG.clone,
					className: "clone",
					icon: "external-link"
				},
				fav: {
					name: LNG.add_to_fav,
					className: "fav ",
					icon: "star",
					accesskey: "f"
				},
				"create-link-home": {
					name: LNG.createLinkHome,
					className: "create-link-home",
					icon: "location-arrow",
					accesskey: "l"
				},
				others: {
					name: LNG.more,
					icon: "ellipsis-horizontal",
					className: "more-action",
					accesskey: "m",
					items: {
						explorer: {
							name: LNG.manage_folder,
							className: "explorer",
							icon: "laptop",
							accesskey: "v"
						},
						"open-browser": {
							name: LNG.open_ie,
							className: "open-browser",
							icon: "globe",
							accesskey: "b"
						},
						sep103: "--------",
						"create-link": {
							name: LNG.createLink,
							className: "create-link",
							icon: "share-alt"
						},
						"create-project": {
							name: LNG.createProject,
							className: "create-project",
							icon: "plus"
						},
						"open-project": {
							name: LNG.openProject,
							className: "open-project",
							icon: "edit"
						}
					}
				},
				sep5: "--------",
				info: {
					name: LNG.info + "<b>Alt+I</b>",
					className: "info",
					icon: "info",
					accesskey: "i"
				}
			}
		})
	},
	x = function() {
		$.contextMenu({
			zIndex: 9999,
			selector: ".tool-path-newfile",
			className: "tool-path-newfile",
			callback: function(a, b) {
				return F(a)
			},
			items: l["new-file-other"].items
		})
	},
	y = function() {
		$.contextMenu({
			zIndex: 9999,
			selector: ".tool-path-upload",
			className: "tool-path-upload",
			callback: function(a, b) {
				switch (core.upload(), a) {
				case "upload-file":
					$(".dialog-file-upload").hide(),
					setTimeout(function() {
						$("#picker .webuploader-element-invisible").click()
					},
					100);
					break;
				case "upload-folder":
					$(".dialog-file-upload").hide(),
					setTimeout(function() {
						$(".drag-upload-folder").click()
					},
					100);
					break;
				case "server-download":
					$(".tab-download").click(),
					$(".download-box input").focus()
				}
			},
			items: {
				"upload-file": {
					name: LNG.file,
					icon: "-",
					className: "upload"
				},
				"upload-folder": {
					name: LNG.folder,
					icon: "-",
					className: "upload upload-folder"
				},
				sep2: "--------",
				"server-download": {
					name: LNG.download_from_server,
					icon: "-",
					className: "download"
				}
			}
		}),
		$.isIE(),
		$.supportUploadFolder() || $(".tool-path-upload .upload.upload-folder").addClass("hidden")
	},
	z = function() {
		$('<i class="' + d.substr(1) + '"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: d,
			className: d.substr(1),
			callback: function(a, b) {
				return F(a)
			},
			items: {
				open: {
					name: LNG.open + "<b>Enter</b>",
					className: "open",
					icon: "folder-open-alt",
					accesskey: "o"
				},
				down: {
					name: LNG.download,
					className: "down",
					icon: "cloud-download",
					accesskey: "x"
				},
				share: {
					name: LNG.share,
					className: "share",
					icon: "share-sign",
					accesskey: "e"
				},
				sep1: "--------",
				copy: {
					name: LNG.copy + "<b>Ctrl+C</b>",
					className: "copy",
					icon: "copy",
					accesskey: "c"
				},
				cute: {
					name: LNG.cute + "<b>Ctrl+X</b>",
					className: "cute",
					icon: "cut",
					accesskey: "k"
				},
				rname: {
					name: LNG.rename + "<b>F2</b>",
					className: "rname",
					icon: "pencil",
					accesskey: "r"
				},
				remove: {
					name: LNG.remove + "<b>Del</b>",
					className: "remove",
					icon: "trash",
					accesskey: "d"
				},
				sep2: "--------",
				"open-browser": {
					name: LNG.open_ie,
					className: "open-browser",
					icon: "globe",
					accesskey: "b"
				},
				search: {
					name: LNG.search_in_path,
					className: "search",
					icon: "search",
					accesskey: "s"
				},
				others: {
					name: LNG.more,
					icon: "ellipsis-horizontal",
					className: "more-action",
					accesskey: "m",
					items: {
						explorer: {
							name: LNG.manage_folder,
							className: "explorer",
							icon: "laptop",
							accesskey: "v"
						},
						clone: {
							name: LNG.clone,
							className: "clone",
							icon: "external-link"
						},
						fav: {
							name: LNG.add_to_fav,
							className: "fav ",
							icon: "star",
							accesskey: "f"
						},
						sep103: "--------",
						"create-link-home": {
							name: LNG.createLinkHome,
							className: "create-link-home",
							icon: "location-arrow",
							accesskey: "l"
						},
						"create-link": {
							name: LNG.createLink,
							className: "create-link",
							icon: "share-alt"
						},
						"create-project": {
							name: LNG.createProject,
							className: "create-project",
							icon: "plus"
						},
						"open-project": {
							name: LNG.openProject,
							className: "open-project",
							icon: "edit"
						}
					}
				},
				sep5: "--------",
				info: {
					name: LNG.info + "<b>Alt+I</b>",
					className: "info",
					icon: "info",
					accesskey: "i"
				}
			}
		})
	},
	A = function() {
		$('<i class="' + c.substr(1) + '"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: c,
			className: c.substr(1),
			callback: function(a, b) {
				return F(a)
			},
			items: {
				open: {
					name: LNG.open + "<b>Enter</b>",
					className: "open",
					icon: "external-link",
					accesskey: "o"
				},
				"open-with": {
					name: LNG.open_with,
					icon: "external-link",
					className: "open-with",
					accesskey: "a",
					items: {
						"open-with-first": {
							name: "",
							className: "hidden open-with-first"
						}
					}
				},
				down: {
					name: LNG.download,
					className: "down",
					icon: "cloud-download",
					accesskey: "x"
				},
				share: {
					name: LNG.share,
					className: "share",
					icon: "share-sign",
					accesskey: "e"
				},
				sep1: "--------",
				copy: {
					name: LNG.copy + "<b>Ctrl+C</b>",
					className: "copy",
					icon: "copy",
					accesskey: "c"
				},
				cute: {
					name: LNG.cute + "<b>Ctrl+X</b>",
					className: "cute",
					icon: "cut",
					accesskey: "k"
				},
				rname: {
					name: LNG.rename + "<b>F2</b>",
					className: "rname",
					icon: "pencil",
					accesskey: "r"
				},
				remove: {
					name: LNG.remove + "<b>Del</b>",
					className: "remove",
					icon: "trash",
					accesskey: "d"
				},
				sep2: "--------",
				"open-browser": {
					name: LNG.open_ie,
					className: "open-browser",
					icon: "globe",
					accesskey: "b"
				},
				"set-background": {
					name: LNG.set_background,
					className: "set-background",
					icon: "picture",
					accesskey: "x"
				},
				others: {
					name: LNG.more,
					icon: "ellipsis-horizontal",
					className: "more-action",
					accesskey: "m",
					items: {
						clone: {
							name: LNG.clone,
							className: "clone",
							icon: "external-link",
							accesskey: "l"
						},
						fav: {
							name: LNG.add_to_fav,
							className: "fav",
							icon: "star"
						},
						sep104: "--------",
						"create-link-home": {
							name: LNG.createLinkHome,
							className: "create-link-home",
							icon: "location-arrow",
							accesskey: "l"
						},
						"create-link": {
							name: LNG.createLink,
							className: "create-link",
							icon: "share-alt"
						}
					}
				},
				sep3: "--------",
				info: {
					name: LNG.info + "<b>Alt+I</b>",
					className: "info",
					icon: "info",
					accesskey: "i"
				}
			}
		})
	},
	B = function() {
		$('<i class="' + e.substr(1) + '"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: e,
			className: e.substr(1),
			callback: function(a, b) {
				return F(a)
			},
			items: {
				copy: {
					name: LNG.copy + "<b>Ctrl+C</b>",
					className: "copy",
					icon: "copy",
					accesskey: "c"
				},
				cute: {
					name: LNG.cute + "<b>Ctrl+X</b>",
					className: "cute",
					icon: "cut",
					accesskey: "k"
				},
				down: {
					name: LNG.download,
					className: "down",
					icon: "cloud-download",
					accesskey: "x"
				},
				sep001: "--------",
				remove: {
					name: LNG.remove + "<b>Del</b>",
					className: "remove",
					icon: "trash",
					accesskey: "d"
				},
				sep1: "--------",
				"copy-to": {
					name: LNG.copy_to,
					className: "copy-to",
					icon: "copy"
				},
				"cute-to": {
					name: LNG.cute_to,
					className: "cute-to",
					icon: "cut"
				},
				sep2: "--------",
				clone: {
					name: LNG.clone + "<b>Ctrl+C</b>",
					className: "clone",
					icon: "external-link",
					accesskey: "n"
				},
				sep3: "--------",
				info: {
					name: LNG.info,
					className: "info",
					icon: "info",
					accesskey: "i"
				}
			}
		})
	},
	C = function() {
		$('<i class="menu-group-root"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: ".menu-group-root",
			callback: function(a, b) {
				return F(a)
			},
			items: {
				open: {
					name: LNG.open + "<b>Enter</b>",
					className: "open",
					icon: "external-link",
					accesskey: "o"
				},
				sep1: "--------",
				fav: {
					name: LNG.add_to_fav,
					className: "fav",
					icon: "star",
					accesskey: "f"
				},
				"create-link-home": {
					name: LNG.createLinkHome,
					className: "create-link-home",
					icon: "location-arrow",
					accesskey: "l"
				}
			}
		}),
		$('<i class="menu-group-root-more"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: ".menu-group-root-more",
			callback: function(a, b) {
				return F(a)
			},
			items: {
				refresh: {
					name: LNG.refresh + "<b>F5</b>",
					className: "refresh",
					icon: "refresh",
					accesskey: "e"
				}
			}
		})
	},
	D = function() {
		$('<i class="menu-fav-path"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: ".menu-fav-path",
			callback: function(a, b) {
				return F(a)
			},
			items: {
				open: {
					name: LNG.open + "<b>Enter</b>",
					className: "open",
					icon: "external-link",
					accesskey: "o"
				},
				sep0: "--------",
				"fav-remove": {
					name: LNG.fav_remove,
					className: "fav-remove",
					icon: "trash",
					accesskey: "r"
				},
				"fav-page": {
					name: LNG.manage_fav,
					className: "fav-page",
					icon: "star",
					accesskey: "f"
				},
				sep1: "--------",
				info: {
					name: LNG.info,
					className: "info",
					icon: "info",
					accesskey: "i"
				}
			}
		}),
		$('<i class="menu-fav-path-more"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: ".menu-fav-path-more",
			className: "menu-fav-path-more",
			callback: function(a, b) {
				return F(a)
			},
			items: {
				"fav-remove": {
					name: LNG.fav_remove,
					className: "fav-remove",
					icon: "trash",
					accesskey: "r"
				}
			}
		})
	},
	E = function(a) {
		switch (a) {
		case "refresh":
			ui.f5(!0, !0);
			break;
		case "back":
			ui.path.history.back();
			break;
		case "next":
			ui.path.history.next();
			break;
		case "set-icon":
			return ui.setListType("icon"),
			!1;
		case "set-list":
			return ui.setListType("list"),
			!1;
		case "set-split":
			return ui.setListType("split"),
			!1;
		case "set-sort-name":
			return ui.setListSort("name", 0),
			!1;
		case "set-sort-ext":
			return ui.setListSort("ext", 0),
			!1;
		case "set-sort-size":
			return ui.setListSort("size", 0),
			!1;
		case "set-sort-mtime":
			return ui.setListSort("mtime", 0),
			!1;
		case "set-sort-up":
			return ui.setListSort(0, "up"),
			!1;
		case "set-sort-down":
			return ui.setListSort(0, "down"),
			!1;
		case "upload":
			core.upload(),
			$(".dialog-file-upload").hide(),
			setTimeout(function() {
				$("#picker .webuploader-element-invisible").click()
			},
			100);
			break;
		case "recycle-clear":
			ui.path.recycleClear();
			break;
		case "box-size-smallx":
			return ui.setFileIconSize(40),
			!1;
		case "box-size-small":
			return ui.setFileIconSize(60),
			!1;
		case "box-size-default":
			return ui.setFileIconSize(80),
			!1;
		case "box-size-big":
			return ui.setFileIconSize(100),
			!1;
		case "box-size-bigx":
			return ui.setFileIconSize(120),
			!1;
		case "past":
			ui.path.past();
			break;
		case "copy-see":
			ui.path.clipboard();
			break;
		case "newfolder":
			ui.path.newFolder();
			break;
		case "newfile":
			ui.path.newFile("txt");
			break;
		case "newfile-null":
			ui.path.newFile("");
			break;
		case "newfile-md":
			ui.path.newFile("md");
			break;
		case "newfile-html":
			ui.path.newFile("html");
			break;
		case "newfile-php":
			ui.path.newFile("php");
			break;
		case "newfile-js":
			ui.path.newFile("js");
			break;
		case "newfile-css":
			ui.path.newFile("css");
			break;
		case "newfile-oexe":
			ui.path.newFile("oexe");
			break;
		case "newfile-docx":
			ui.path.newFile("docx");
			break;
		case "newfile-xlsx":
			ui.path.newFile("xlsx");
			break;
		case "newfile-pptx":
			ui.path.newFile("pptx");
			break;
		case "info":
			ui.path.info();
			break;
		case "open":
			ui.path.open();
			break;
		case "app-install":
			ui.path.appList();
			break;
		case "setting":
			core.setting();
			break;
		case "setting-theme":
			core.setting("theme");
			break;
		case "setting-wall":
			core.setting("wall")
		}
	},
	F = function(a) {
		switch (a) {
		case "open":
			ui.path.open();
			break;
		case "down":
			ui.path.download();
			break;
		case "share":
			ui.path.share();
			break;
		case "open-browser":
			ui.path.openWindow();
			break;
		case "share-edit":
			ui.path.shareEdit();
			break;
		case "share-open-window":
			ui.path.shareOpenWindow();
			break;
		case "share-open-path":
			ui.path.shareOpenPath();
			break;
		case "fav":
			ui.path.fav();
			break;
		case "search":
			ui.path.search();
			break;
		case "copy":
			ui.path.copy();
			break;
		case "clone":
			ui.path.copyDrag(G.thisPath, !0);
			break;
		case "cute":
			ui.path.cute();
			break;
		case "cute-to":
			ui.path.cuteTo();
			break;
		case "copy-to":
			ui.path.copyTo();
			break;
		case "remove":
			ui.path.remove();
			break;
		case "rname":
			ui.path.rname();
			break;
		case "set-background":
			ui.path.setBackground();
			break;
		case "create-link-home":
			ui.path.createLink(!1);
			break;
		case "create-link":
			ui.path.createLink(!0);
			break;
		case "create-project":
			ui.path.createProject();
			break;
		case "open-project":
			ui.path.openProject();
			break;
		case "explorer":
			ui.path.explorer();
			break;
		case "explorer-new":
			ui.path.explorerNew();
			break;
		case "fav-page":
			core.setting("fav");
			break;
		case "fav-remove":
			ui.path.favRemove();
			break;
		case "info":
			ui.path.info();
			break;
		default:
			return E(a)
		}
	},
	H = function() {
		$('<i class="menu-tree-fav-root"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: ".menu-tree-fav-root",
			callback: function(a, b) {
				return P(a)
			},
			items: {
				"fav-page": {
					name: LNG.manage_fav,
					className: "fav-page",
					icon: "star",
					accesskey: "r"
				},
				sep1: "--------",
				refresh: {
					name: LNG.refresh,
					className: "refresh",
					icon: "refresh",
					accesskey: "e"
				}
			}
		}),
		$('<i class="menu-tree-fav"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: ".menu-tree-fav",
			callback: function(a, b) {
				return P(a)
			},
			items: {
				"fav-remove": {
					name: LNG.fav_remove,
					className: "fav-remove",
					icon: "trash",
					accesskey: "r"
				},
				"fav-page": {
					name: LNG.manage_fav,
					className: "fav-page",
					icon: "star",
					accesskey: "f"
				},
				sep2: "--------",
				"create-link-home": {
					name: LNG.createLinkHome,
					className: "create-link-home",
					icon: "location-arrow",
					accesskey: "l"
				},
				refresh: {
					name: LNG.refresh_tree,
					className: "refresh",
					icon: "refresh",
					accesskey: "e"
				},
				info: {
					name: LNG.info,
					className: "info",
					icon: "info",
					accesskey: "i"
				}
			}
		})
	},
	I = function() {
		$('<i class="' + f.substr(1) + '"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: f,
			callback: function(a, b) {
				return P(a)
			},
			items: {
				explorer: {
					name: LNG.manage_folder,
					className: "explorer",
					icon: "laptop",
					accesskey: "v"
				},
				refresh: {
					name: LNG.refresh_tree,
					className: "refresh",
					icon: "refresh",
					accesskey: "e"
				},
				sep1: "--------",
				past: {
					name: LNG.past,
					className: "past",
					icon: "paste",
					accesskey: "p"
				},
				newfolder: {
					name: LNG.newfolder,
					className: "newfolder",
					icon: "folder-close-alt",
					accesskey: "n"
				},
				newfile: {
					name: LNG.newfile,
					className: "newfile",
					icon: "file-text-alt",
					accesskey: "j"
				},
				sep2: "--------",
				fav: {
					name: LNG.add_to_fav,
					className: "fav",
					icon: "star",
					accesskey: "f"
				},
				search: {
					name: LNG.search_in_path,
					className: "search",
					icon: "search",
					accesskey: "s"
				}
			}
		})
	},
	J = function() {
		$('<i class="menu-tree-folder"></i>').appendTo("#rightMenu"),
		$('<i class="menu-tree-folder-fav"></i>').appendTo("#rightMenu");
		var a = {
			zIndex: 9999,
			selector: ".menu-tree-folder",
			callback: function(a, b) {
				return P(a)
			},
			items: {
				download: {
					name: LNG.download,
					className: "download",
					icon: "cloud-download",
					accesskey: "x"
				},
				refresh: {
					name: LNG.refresh_tree,
					className: "refresh",
					icon: "refresh",
					accesskey: "e"
				},
				sep1: "--------",
				copy: {
					name: LNG.copy,
					className: "copy",
					icon: "copy",
					accesskey: "c"
				},
				cute: {
					name: LNG.cute,
					className: "cute",
					icon: "cut",
					accesskey: "k"
				},
				past: {
					name: LNG.past,
					className: "past",
					icon: "paste",
					accesskey: "p"
				},
				rname: {
					name: LNG.rename,
					className: "rname",
					icon: "pencil",
					accesskey: "r"
				},
				remove: {
					name: LNG.remove,
					className: "remove",
					icon: "trash",
					accesskey: "d"
				},
				sep2: "--------",
				newfolder: {
					name: LNG.newfolder,
					className: "newfolder",
					icon: "folder-close-alt",
					accesskey: "n"
				},
				search: {
					name: LNG.search_in_path,
					className: "search",
					icon: "search",
					accesskey: "s"
				},
				"open-browser": {
					name: LNG.open_ie,
					className: "open-browser",
					icon: "globe"
				},
				others: {
					name: LNG.more,
					icon: "ellipsis-horizontal",
					accesskey: "m",
					items: {
						explorer: {
							name: LNG.manage_folder,
							className: "explorer",
							icon: "laptop",
							accesskey: "v"
						},
						clone: {
							name: LNG.clone,
							className: "clone",
							icon: "external-link",
							accesskey: "l"
						},
						fav: {
							name: LNG.add_to_fav,
							className: "fav",
							icon: "star"
						},
						share: {
							name: LNG.share,
							className: "share",
							icon: "share-sign",
							accesskey: "e"
						},
						sep105: "--------",
						"create-link-home": {
							name: LNG.createLinkHome,
							className: "create-link-home",
							icon: "location-arrow",
							accesskey: "l"
						},
						"open-project": {
							name: LNG.openProject,
							className: "open-project",
							icon: "edit"
						}
					}
				},
				sep3: "--------",
				info: {
					name: LNG.info + '<b class="ml-20"></b>',
					className: "info",
					icon: "info",
					accesskey: "i"
				}
			}
		};
		$.contextMenu(a);
		var b = {
			"fav-remove": {
				name: LNG.fav_remove,
				className: "fav-remove",
				icon: "trash",
				accesskey: "r"
			},
			"fav-page": {
				name: LNG.manage_fav,
				className: "fav-page",
				icon: "star",
				accesskey: "f"
			},
			sep0: "--------"
		};
		a.selector = ".menu-tree-folder-fav",
		a.items = $.extend(b, a.items, !0),
		$.contextMenu(a)
	},
	K = function() {
		$('<i class="' + g.substr(1) + '"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: g,
			callback: function(a, b) {
				return P(a)
			},
			items: {
				explorer: {
					name: LNG.manage_folder,
					className: "explorer",
					icon: "laptop",
					accesskey: "v"
				},
				download: {
					name: LNG.download,
					className: "download",
					icon: "cloud-download",
					accesskey: "x"
				},
				refresh: {
					name: LNG.refresh_tree,
					className: "refresh",
					icon: "refresh",
					accesskey: "e"
				},
				sep1: "--------",
				copy: {
					name: LNG.copy,
					className: "copy",
					icon: "copy",
					accesskey: "c"
				},
				cute: {
					name: LNG.cute,
					className: "cute",
					icon: "cut",
					accesskey: "k"
				},
				past: {
					name: LNG.past,
					className: "past",
					icon: "paste",
					accesskey: "p"
				},
				rname: {
					name: LNG.rename,
					className: "rname",
					icon: "pencil",
					accesskey: "r"
				},
				remove: {
					name: LNG.remove,
					className: "remove",
					icon: "trash",
					accesskey: "d"
				},
				sep2: "--------",
				newfolder: {
					name: LNG.newfolder,
					className: "newfolder",
					icon: "folder-close-alt",
					accesskey: "n"
				},
				"new-file-other": l["new-file-other"],
				search: {
					name: LNG.search_in_path,
					className: "search",
					icon: "search",
					accesskey: "s"
				},
				"open-browser": {
					name: LNG.open_ie,
					className: "open-browser",
					icon: "globe"
				},
				others: {
					name: LNG.more,
					icon: "ellipsis-horizontal",
					accesskey: "m",
					className: "more-action",
					items: {
						explorer: {
							name: LNG.manage_folder,
							className: "explorer",
							icon: "laptop",
							accesskey: "v"
						},
						clone: {
							name: LNG.clone,
							className: "clone",
							icon: "external-link",
							accesskey: "l"
						},
						fav: {
							name: LNG.add_to_fav,
							className: "fav",
							icon: "star"
						},
						share: {
							name: LNG.share,
							className: "share",
							icon: "share-sign",
							accesskey: "e"
						},
						sep106: "--------",
						"create-link-home": {
							name: LNG.createLinkHome,
							className: "create-link-home",
							icon: "location-arrow",
							accesskey: "l"
						},
						"open-project": {
							name: LNG.openProject,
							className: "open-project",
							icon: "edit"
						}
					}
				},
				sep3: "--------",
				info: {
					name: LNG.info + '<b class="ml-20">Alt+I</b>',
					className: "info",
					icon: "info",
					accesskey: "i"
				}
			}
		})
	},
	L = function() {
		$('<i class="' + i.substr(1) + '"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: i,
			callback: function(a, b) {
				return P(a)
			},
			items: {
				refresh: {
					name: LNG.refresh,
					className: "refresh",
					icon: "refresh",
					accesskey: "e"
				}
			}
		})
	},
	M = function() {
		$('<i class="' + j.substr(1) + '"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: j,
			callback: function(a, b) {
				return P(a)
			},
			items: {
				fav: {
					name: LNG.add_to_fav,
					className: "fav",
					icon: "star",
					accesskey: "f"
				},
				"create-link-home": {
					name: LNG.createLinkHome,
					className: "create-link-home",
					icon: "location-arrow",
					accesskey: "l"
				}
			}
		})
	},
	N = function() {
		$('<i class="' + k.substr(1) + '"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			selector: k,
			callback: function(a, b) {
				var c = b.$trigger;
				return c.hasClass("file") ? F(a) : P(a)
			},
			items: {
				fav: {
					name: LNG.add_to_fav,
					className: "fav",
					icon: "star",
					accesskey: "f"
				},
				"create-link-home": {
					name: LNG.createLinkHome,
					className: "create-link-home",
					icon: "location-arrow",
					accesskey: "l"
				}
			}
		})
	},
	O = function() {
		$('<i class="' + h.substr(1) + '"></i>').appendTo("#rightMenu"),
		$.contextMenu({
			zIndex: 9999,
			className: h.substr(1),
			selector: h,
			callback: function(a, b) {
				return P(a)
			},
			items: {
				open: {
					name: LNG.open,
					className: "open",
					icon: "external-link",
					accesskey: "o"
				},
				"open-with": {
					name: LNG.open_with,
					icon: "external-link",
					className: "open-with",
					accesskey: "a",
					items: {
						"open-with-first": {
							name: "",
							className: "hidden open-with-first"
						}
					}
				},
				download: {
					name: LNG.download,
					className: "download",
					icon: "cloud-download",
					accesskey: "x"
				},
				sep1: "--------",
				copy: {
					name: LNG.copy,
					className: "copy",
					icon: "copy",
					accesskey: "c"
				},
				cute: {
					name: LNG.cute,
					className: "cute",
					icon: "cut",
					accesskey: "k"
				},
				rname: {
					name: LNG.rename,
					className: "rname",
					icon: "pencil",
					accesskey: "r"
				},
				remove: {
					name: LNG.remove,
					className: "remove",
					icon: "trash",
					accesskey: "d"
				},
				sep2: "--------",
				"open-browser": {
					name: LNG.open_ie,
					className: "open-browser",
					icon: "globe"
				},
				clone: {
					name: LNG.clone,
					className: "clone",
					icon: "external-link",
					accesskey: "l"
				},
				others: {
					name: LNG.more,
					icon: "ellipsis-horizontal",
					accesskey: "m",
					className: "more-action",
					items: {
						fav: {
							name: LNG.add_to_fav,
							className: "fav",
							icon: "star"
						},
						share: {
							name: LNG.share,
							className: "share",
							icon: "share-sign",
							accesskey: "e"
						},
						"create-link-home": {
							name: LNG.createLinkHome,
							className: "create-link-home",
							icon: "location-arrow",
							accesskey: "l"
						}
					}
				},
				sep3: "--------",
				info: {
					name: LNG.info + '<b class="ml-20">Alt+I</b>',
					className: "info",
					icon: "info",
					accesskey: "i"
				}
			}
		})
	},
	P = function(a) {
		switch (a) {
		case "open":
			ui.tree.open();
			break;
		case "refresh":
			ui.tree.refresh();
			break;
		case "copy":
			ui.tree.copy();
			break;
		case "cute":
			ui.tree.cute();
			break;
		case "past":
			ui.tree.past();
			break;
		case "clone":
			ui.tree.clone();
			break;
		case "rname":
			ui.tree.rname();
			break;
		case "remove":
			ui.tree.remove();
			break;
		case "info":
			ui.tree.info();
			break;
		case "cute-to":
			ui.tree.cuteTo();
			break;
		case "copy-to":
			ui.tree.copyTo();
			break;
		case "download":
			ui.tree.download();
			break;
		case "open-browser":
			ui.tree.openWindow();
			break;
		case "search":
			ui.tree.search();
			break;
		case "share":
			ui.tree.share();
			break;
		case "search":
			ui.tree.search();
			break;
		case "newfolder":
			ui.tree.create("folder");
			break;
		case "newfile":
			ui.tree.create("txt");
			break;
		case "newfile-html":
			ui.tree.create("html");
			break;
		case "newfile-php":
			ui.tree.create("php");
			break;
		case "newfile-js":
			ui.tree.create("js");
			break;
		case "newfile-css":
			ui.tree.create("css");
			break;
		case "newfile-oexe":
			ui.tree.create("oexe");
			break;
		case "explorer":
			ui.tree.explorer();
			break;
		case "open-project":
			ui.tree.openProject();
			break;
		case "fav-page":
			core.setting("fav");
			break;
		case "fav":
			ui.tree.fav();
			break;
		case "create-link-home":
			ui.tree.createLink(!1);
			break;
		case "fav-remove":
			ui.tree.favRemove();
			break;
		case "refresh-all":
			ui.tree.init();
			break;
		case "quit":
		}
	};
	return {
		initDesktop:
		n,
		initExplorer: m,
		initEditor: o
	}
});;
define("app/src/editor/ui", [],
function(a, b, c) {
	var d = function() {
		$(".tools-left a").click(function(a) {
			var b = $(this).attr("class");
			switch (b) {
			case "home":
				tree.init();
				break;
			case "view":
				tree.explorer();
				break;
			case "folder":
				tree.create("folder");
				break;
			case "file":
				tree.create("txt");
				break;
			case "refresh":
				tree.refresh()
			}
		})
	};
	return {
		init:
		function() {
			tree.init(),
			d(),
			Mousetrap.bind(["ctrl+s", "command+s"],
			function(a) {
				a.preventDefault(),
				a.returnvalue = !1,
				ShareData.frameTop("OpenopenEditor",
				function(a) {
					a.Editor.save()
				})
			})
		},
		setTheme: function(a) {
			core.setSkin(a),
			ShareData.frameTop("OpenopenEditor",
			function(b) {
				b.Editor.setTheme(a)
			})
		},
		editorFull: function() {
			var a = $("iframe[name=OpenopenEditor]");
			a.toggleClass("frame-fullscreen")
		},
		fileHistory: function(a) {
			var b = G.project;
			if ("undefined" != typeof G.sid && (b = b + "__" + G.sid), b = "editorHistory_" + b, void 0 == a) {
				var c = LocalData.get(b);
				return c = jsonDecode(c),
				$.isArray(c) || (c = []),
				c
			}
			LocalData.set(b, jsonEncode(a))
		}
	}
});;
define("app/path/path", ["./pathOperate", "./tpl/share.html", "./tpl/fileinfo/fileInfo.html", "./tpl/fileinfo/pathInfo.html", "./tpl/fileinfo/pathInfoMore.html", "./tpl/appEdit.html", "./clipboard", "./search", "./tpl/search.html", "./tpl/searchList.html", "./tpl/file/create.html"],
function(a, b) {
	var c = a("./pathOperate"),
	d = a("./clipboard"),
	e = a("./search"),
	f = void 0,
	g = function() {
		if (lodash.get(G, "jsonData.info.pathType") == G.KOD_USER_RECYCLE || lodash.get(G, "jsonData.info.pathType") == G.KOD_USER_SHARE) return ! 0;
		if (ui.fileLight) {
			var a = ui.fileLight.fileListSelect();
			if (a.hasClass("systemBox")) return Tips.tips(LNG.path_can_not_action, "warning"),
			!1
		}
		return ! 0
	},
	h = function(a, b, c, d) {
		if (a) {
			if (!core.isApp("explorer")) return void core.explorer(a);
			if (a == G.thisPath) return void(void 0 != b && "" != b && Tips.tips(LNG.path_is_current, "info"));
			G.thisPath = a.replace(/\\/g, "/"),
			G.thisPath = a.replace(/\/+/g, "/"),
			"/" != G.thisPath.substr(G.thisPath.length - 1) && (G.thisPath += "/");
			var e = $(".dialog-file-upload");
			if (e.length > 0) {
				var f = "none" == e.css("display") || "hidden" == e.css("visibility");
				f || core.upload()
			}
			if ("undefined" != typeof G.sid && (window.location.href = "#" + urlEncode(G.thisPath)), core.playSound("folder_open"), d || ui.path.history.add(G.thisPath), "split" == G.userConfig.listType) {
				var g = $(".split-box .file[data-path=" + pathHashEncode(G.thisPath) + "]");
				if (0 != g.length && 0 != g.find(".children-more-cert").length) return void g.click();
				$(".file-list-split .split-box").remove()
			}
			ui.f5Callback(function() {
				"function" == typeof c && c()
			})
		}
	},
	i = function() {
		var a = [],
		b = 60,
		c = 0,
		d = function(d) {
			var e = a.length - 1;
			return e == c && a[e] == d ? g() : (c != e && (a = a.slice(0, c + 1)), a[a.length - 1] != d && a.push(d), a.length >= b && (a = a.slice(1)), c = a.length - 1, void g())
		},
		e = function() {
			c + 1 <= a.length - 1 && (h(a[++c], "", "", !0), g())
		},
		f = function() {
			c - 1 >= 0 && (h(a[--c], "", "", !0), g())
		},
		g = function() {
			var b = "disable",
			d = a.length - 1;
			$("#btn-history-next").addClass(b),
			$("#btn-history-back").addClass(b),
			(0 != c || 0 != d) && (c > 0 && d >= c && $("#btn-history-back").removeClass(b), c >= 0 && c != d && $("#btn-history-next").removeClass(b))
		};
		return {
			add: d,
			back: f,
			next: e,
			list: function() {
				return a
			}
		}
	} (),
	j = function(a) {
		if (void 0 != a) {
			"string" == typeof a && (a = [a]);
			for (var b = 0; b < a.length; b++) a[b] = trim(a[b], "/");
			ui.fileLight.clear(),
			ui.fileLight.fileListAll().each(function(b, c) {
				var d = trim(ui.fileLight.path($(this)), "/");
				d && -1 != $.inArray(d, a) && $(this).addClass(Config.SelectClassName)
			}),
			ui.fileLight.select(),
			ui.fileLight.setInView()
		}
	},
	k = function(a) {
		if ("" != a) {
			if (a = a.toLowerCase(), void 0 == f || G.thisPath != f.path || a != f.key) {
				var b = [];
				ui.fileLight.fileListAll().each(function() {
					var c = ui.fileLight.name($(this)),
					d = ui.fileLight.path($(this));
					c && a == c.substring(0, a.length).toLowerCase() && b.push(d)
				}),
				f = {
					key: a,
					path: G.thisPath,
					index: 0,
					list: b
				}
			}
			0 != f.list.length && (Tips.pop(f.key), j(f.list[f.index++]), f.index == f.list.length && (f.index = 0))
		}
	},
	l = function(a) {
		return "" == a ? void ui.fileLight.clear() : (ui.fileLight.clear(), ui.fileLight.fileListAll().each(function(b, c) {
			var d = ui.fileLight.name($(this)); - 1 != d.toLowerCase().indexOf(a) && $(ui.fileLight.fileListAll()).eq(b).addClass(Config.SelectClassName)
		}), ui.fileLight.select(), void ui.fileLight.setInView())
	},
	m = function(a, b) {
		var c = G.thisPath + a;
		return void 0 == b && (c += "/"),
		0 != $('.bodymain .file[data-path="' + pathHashEncode(c) + '"]').length ? !0 : !1
	},
	n = function(a, b) {
		var c, d = 0,
		e = "." + b;
		if ((void 0 == b || "" == b) && (e = ""), !m(a + e, b)) return a + e;
		for (c = a + "(0)" + e; m(c, b);) d++,
		c = a + "(" + d + ")" + e;
		return c
	},
	o = function(a, b) {
		var c, d = 0,
		e = G.jsonData.folderList,
		f = G.userConfig.listSortField,
		g = G.userConfig.listSortOrder,
		h = {
			name: a,
			size: 0,
			ext: b,
			mtime: date("Y/m/d H:i:s", time())
		};
		if (core.isApp("desktop") && (d += $(".menu-default").length + 1), "file" == b) {
			h.ext = core.pathExt(a);
			var i = {
				docx: 9623,
				html: 221,
				php: 6,
				pptx: 28702,
				xlsx: 4659
			};
			h.size = i[h.ext] || 0,
			e = G.jsonData.fileList,
			d += G.jsonData.folderList.length
		}
		if ("down" == g) {
			for (c = 0; c < e.length; c++) {
				var j = pathTools.strSort(e[c][f], h[f]),
				k = pathTools.strSort(e[c].name, h.name);
				if ( - 1 == j || 0 == j && -1 == k) break
			}
			c--
		} else for (c = e.length - 1; c >= 0; c--) {
			var j = pathTools.strSort(e[c][f], h[f]),
			k = pathTools.strSort(e[c].name, h.name);
			if ( - 1 == j || 0 == j && -1 == k) break
		}
		return c + d
	},
	p = function(b, d, e) {
		ui.fileLight.clear();
		var f = o(d, b),
		g = $(Config.FileBoxSelector);
		"split" == G.userConfig.listType && (g = $(".split-box.split-select").find(".content"));
		var h = a("./tpl/file/create.html"),
		i = template.compile(h),
		j = i({
			type: b,
			newname: d,
			ext: e,
			listType: G.userConfig.listType
		});
		if ( - 1 == f || 0 == g.find(".file").length) g.html(j + g.html());
		else {
			var k = g.children(".file:eq(" + f + ")");
			0 == k.length && (k = g.children(".file").last()),
			"list" == G.userConfig.listType ? k.next().hasClass("children-list") && (k = k.next()) : "split" == G.userConfig.listType && (k = $(".split-box.split-select .file").last()),
			$(j).insertAfter(k)
		}
		var l = $(".textarea .newfile"),
		n = d.length;
		"folder" != b && -1 != d.indexOf(".") && (n = d.length - e.length - 1),
		l.textSelect(0, n),
		"split" == G.userConfig.listType && l.css("width", l.parents(".filename").width() - 40),
		"icon" == G.userConfig.listType ? ($("#makefile").css({
			height: $("#makefile").width() + 15,
			transition: "none"
		}), $("#makefile .textarea").css("margin-top", "-13px")) : $("#makefile .x-item-file").addClass("small"),
		core.isApp("desktop") && ui.resetDesktopIcon();
		var p = function(a) {
			a === !1 ? $("#makefile").remove() : r(a)
		},
		q = function(a) {
			if ("" == trim(a)) return $("#makefile").remove(),
			void Tips.tips(LNG.error, "warning");
			if (m(a, e)) $("#makefile").remove(),
			Tips.tips(LNG.path_exists, "warning");
			else {
				var d = G.thisPath;
				"split" == G.userConfig.listType && (d = ui.fileLight.path($(".file-icon-edit").parents(".split-box"))),
				"folder" == b ? c.newFolder(d + a, p) : c.newFile(d + a, p)
			}
		};
		ui.fileLight.setInView($(".file-continer .file-icon-edit")),
		l.focus().autoTextarea(),
		l.unbind("keydown").keydown(function(a) {
			13 == a.keyCode && (stopPP(a), a.preventDefault(), q(l.attr("value"))),
			27 == a.keyCode && $("#makefile").remove()
		}).unbind("blur").blur(function() {
			q(l.attr("value"))
		})
	},
	q = function() {
		var a = "",
		b = ui.fileLight.fileListSelect(),
		d = ui.fileLight.name(b),
		e = core.pathFather(ui.fileLight.path(b)),
		f = ui.fileLight.type(b);
		if (1 == b.length && g()) {
			if (b.hasClass("menuSharePath")) return void ui.path.shareEdit();
			var h = htmlEncode(rtrim(d, ".oexe")),
			i = "<input class='fix' id='pathRenameTextarea' value='" + h + "'/>";
			"icon" == G.userConfig.listType && (i = "<textarea class='fix' id='pathRenameTextarea'>" + h + "</textarea>", b.css({
				height: b.height()
			})),
			$(b).addClass("file-icon-edit").find(".title").html("<div class='textarea'>" + i + "<div>");
			var j = $("#pathRenameTextarea");
			"split" == G.userConfig.listType && j.css({
				width: j.parents(".filename").width() - 32,
				height: j.parents(".filename").height() + 1
			});
			var k = d.length;
			"folder" != f && -1 != d.indexOf(".") && (k = d.length - f.length - 1),
			f || 0 != d.indexOf(".") ? j.textSelect(0, k) : j.textSelect(0, d.length);
			var l = function(g) {
				"oexe" == f && (g += ".oexe");
				if (g != d) a = e + d,
				g = e + g,
				c.rname(a, g,
				function(a) {
					a === !1 ? $(b).removeClass("file-icon-edit").find(".title").html(htmlEncode(d)) : r(a)
				});
				else {
					var h = d;
					".oexe" == h.substr( - 5) && (h = h.substr(0, h.length - 5)),
					$(b).removeClass("file-icon-edit").find(".title").html(htmlEncode(h))
				}
			};
			j.focus().autoTextarea(),
			j.keydown(function(a) {
				13 == a.keyCode && (a.preventDefault(), stopPP(a), l(j.attr("value"))),
				27 == a.keyCode && ("oexe" == f && (d = d.replace(".oexe", "")), $(b).removeClass("file-icon-edit").find(".title").html(d))
			}).unbind("blur").blur(function() {
				l(j.val())
			})
		}
	},
	r = function(a) {
		ui.fileLight.clear(),
		ui.f5Callback(function() {
			j(a),
			core.isApp("explorer") && ui.tree.checkIfChange(G.thisPath)
		})
	},
	s = function(a) {
		var b = {},
		c = [];
		a.sort(function(a, b) {
			return a.path == b.path ? 0 : a.path > b.path ? 1 : -1
		});
		for (var d = function(a) {
			for (var c = a;
			"" != a;) {
				if ("undefined" != typeof b[a]) return 1 == b[a] ? !0 : c == a ? (b[a] = 1, !1) : !0;
				a = core.pathFather(a)
			}
			return ! 1
		},
		e = 0; e < a.length; e++) if ("folder" == a[e].type) {
			var f = rtrim(a[e].path, "/") + "/";
			b[f] || d(f) || (b[f] = 0)
		}
		for (var e = 0; e < a.length; e++) {
			var f = a[e].path;
			"folder" == a[e].type ? f = rtrim(f, "/") + "/": a[e].type = "file",
			d(f) || c.push(a[e])
		}
		return c
	},
	t = function(a, b, c) {
		var d = [];
		return ShareData.data("FILE_SELECT_ARRAY") ? (d = ShareData.data("FILE_SELECT_ARRAY"), ShareData.remove("FILE_SELECT_ARRAY")) : ui.fileLight.fileListSelect().each(function(a) {
			d.push({
				path: ui.fileLight.path($(this)),
				type: ui.fileLight.type($(this))
			})
		}),
		a ? s(d) : 1 != d.length ? {
			path: "",
			type: ""
		}: d[0]
	},
	u = function(a, b) {
		for (var c in G.jsonData) if ("fileList" == c || "folderList" == c) for (var d = 0; d < G.jsonData[c].length; d++) if (G.jsonData[c][d][a] == b) return G.jsonData[c][d]
	};
	return {
		search: e,
		makeParam: t,
		refreshCallback: r,
		history: i,
		getJsondataCell: u,
		checkSystemPath: g,
		pathOperate: c,
		appList: function() {
			c.appList(t().path)
		},
		appInstall: function() {
			c.appInstall(t().path)
		},
		openWindow: function() {
			kodApp.openWindow(t().path)
		},
		open: function(a) {
			var b = ui.fileLight.fileListSelect();
			if (void 0 != a || core.isApp("editor")) return kodApp.setLastOpenTarget($(".curSelectedNode").parent()),
			void kodApp.open(a);
			if (0 != b.length) {
				var c = t();
				if ($(b).hasClass("file-not-exists")) return void Tips.tips(LNG.share_error_path, !1);
				if ("split" != G.userConfig.listType || "folder" != c.type) {
					if ("oexe" == c.type) {
						var d = b.attr("data-app");
						if (d) {
							var e = jsonDecode(base64Decode(d));
							return void core.openApp(e)
						}
					}
					kodApp.setLastOpenTarget(b),
					kodApp.open(c.path, c.type)
				}
			}
		},
		share: function() {
			c.share(t())
		},
		setBackground: function() {
			var a = core.path2url(t().path);
			ShareData.frameTop("",
			function(b) {
				b.ui.setWall(a)
			}),
			ui.setWall(a),
			c.setBackground(a)
		},
		createLink: function(a) {
			var b = t(),
			d = ui.fileLight.fileListSelect().last();
			b.name = trim(d.find(".filename").text()),
			c.createLink(b.path, b.name, b.type, a, r)
		},
		createProject: function() {
			c.createProject(t().path, r)
		},
		download: function() {
			if (!core.authCheckGroup("explorer.fileDownload")) return void Tips.tips(LNG.no_permission_action, "error");
			var a = t(!0),
			b = !1;
			$.each(a,
			function() {
				"folder" == this.type && (b = !0)
			}),
			b || a.length > 1 ? c.zipDownload(a) : $.each(a,
			function() {
				kodApp.download(this.path)
			})
		},
		shareEdit: function() {
			var a = u("path", t().path);
			try {
				var b = G.jsonData.shareList[a.sid];
				c.shareBox(b)
			} catch(d) {}
		},
		shareOpenWindow: function() {
			var a = u("path", t().path),
			b = "file";
			"folder" == a.type && (b = 1 == a.codeRead ? "codeRead": "folder");
			var c = G.appHost + "share/" + b + "&user=" + G.jsonData.info.id + "&sid=" + a.sid;
			window.open(c)
		},
		shareOpenPath: function() {
			var a = t(),
			b = u("path", a.path);
			if (!b || !G.jsonData.shareList) return void kodApp.open(a.path, a.type);
			var c = G.jsonData.shareList[b.sid],
			d = core.pathFather(c.path),
			e = core.pathThis(c.path);
			"folder" == c.type ? ui.path.list(c.path, "") : ui.path.list(d, "",
			function() {
				j(e)
			})
		},
		explorer: function() {
			core.explorer(t().path)
		},
		explorerNew: function() {
			window.open(G.appHost + "explorer&path=" + t().path)
		},
		openProject: function() {
			core.explorerCode(t().path)
		},
		search: function(a, b) {
			return a ? void e(a, b) : void e("", t().path)
		},
		fav: function() {
			var a = t(),
			b = ui.fileLight.fileListSelect().last();
			a.name = trim(b.find(".filename").text()),
			c.fav(a)
		},
		recycleClear: function() {
			c.remove([{
				type: "recycle-clear",
				path: ""
			}],
			function() {
				ui.f5()
			})
		},
		remove: function(a, b, d) {
			if (G.jsonData.info && g()) {
				var e = t(!0);
				G.jsonData.info && G.jsonData.info.pathType == G.KOD_USER_SHARE && G.jsonData.info.id == G.userID && -1 == trim(G.thisPath, "/").indexOf("/") && $.each(e,
				function(a, b) {
					var c = u("path", e[a].path);
					void 0 != c && (e[a].type = "share", e[a].path = c.sid)
				}),
				d ? c.remove(e, d, a, b) : c.remove(e, r, a, b)
			}
		},
		favRemove: function() {
			var a = $(".file.select .filename");
			a.each(function(b) {
				var d = trim($(this).text());
				b != a.length - 1 ? c.favRemove(d, "", !0) : c.favRemove(d,
				function(a) {
					Tips.tips(a),
					ui.tree.refreshFav()
				},
				!0)
			})
		},
		clipboard: function() {
			d.clipboard()
		},
		copy: function() {
			g() && d.copy(t(!0))
		},
		cute: function() {
			g() && d.cute(t(!0), ui.f5)
		},
		cuteDrag: function(a) {
			d.cuteDrag(t(!0), a, r)
		},
		copyDrag: function(a, b) {
			d.copyDrag(t(!0), a, r, b)
		},
		copyTo: function() {
			core.api.pathSelect({
				type: "folder",
				title: LNG.copy_to
			},
			function(a) {
				d.copyDrag(t(!0), a, r, !1)
			})
		},
		cuteTo: function() {
			core.api.pathSelect({
				type: "folder",
				title: LNG.cute_to
			},
			function(a) {
				d.cuteDrag(t(!0), a, r)
			})
		},
		past: function() {
			var a = G.thisPath;
			"split" == G.userConfig.listType && ($containBox = $(".split-box.split-select"), 1 == $containBox.length && (a = ui.fileLight.path($containBox))),
			d.past(a, r)
		},
		info: function() {
			c.info(t(!0))
		},
		newFile: function(a) {
			void 0 == a && (a = "txt"),
			p("file", n(LNG.newfile, a), a)
		},
		newFolder: function() {
			p("folder", n(LNG.newfolder), "")
		},
		shareFile: function() {
			var a = G.appHost + "share/file&sid=" + G.sid + "&user=" + G.user + "&path=" + urlEncode(t().path);
			window.open(a)
		},
		rname: q,
		list: h,
		setSearchByStr: l,
		setSelectByChar: k,
		setSelectByFilename: j
	}
});;
define("app/path/pathOperate", ["./tpl/share.html", "./tpl/fileinfo/fileInfo.html", "./tpl/fileinfo/pathInfo.html", "./tpl/fileinfo/pathInfoMore.html", "./tpl/appEdit.html"],
function(a, b) {
	var c = ["/", "\\", ":", "*", "?", '"', "<", ">", "|"],
	d = ["/", "\\"],
	e = function(a) {
		var b = function(a, b) {
			for (var c = b.length,
			d = 0; c > d; d++) if (a.indexOf(b[d]) > 0) return ! 0;
			return ! 1
		},
		e = d;
		return G.systemOS && "windows" == G.systemOS && (e = c),
		b(a, e) ? (Tips.tips(LNG.path_not_allow + ":    " + e.join(", "), !1), !1) : !0
	},
	f = function(a) {
		for (var b = [], c = function(a) {
			return a ? a.replace(/"/g, '\\\\"') : a
		},
		d = 0; d < a.length; d++) b.push({
			type: c(a[d].type),
			path: urlEncode(c(a[d].path))
		});
		return "dataArr=" + jsonEncode(b)
	},
	g = function(a, b) {
		if (a) {
			var c = core.pathThis(a);
			return e(c) ? void $.ajax({
				dataType: "json",
				url: G.appHost + "explorer/mkfile&path=" + urlEncode(a),
				beforeSend: function() {
					"function" == typeof b && Tips.loading()
				},
				error: core.ajaxError,
				success: function(a) {
					"function" == typeof b && (Tips.close(a), b(a && a.info ? a.info: !1))
				}
			}) : void("function" == typeof b && b())
		}
	},
	h = function(a, b) {
		if (a) {
			var c = core.pathThis(a);
			return e(c) ? void $.ajax({
				dataType: "json",
				url: G.appHost + "explorer/mkdir&path=" + urlEncode(a),
				beforeSend: function() {
					"function" == typeof b && Tips.loading()
				},
				error: core.ajaxError,
				success: function(a) {
					"function" == typeof b && (Tips.close(a), b(a && a.info ? a.info: !1))
				}
			}) : void("function" == typeof b && b())
		}
	},
	i = function(a, b, c) {
		return a && b && a != b ? e(core.pathThis(b)) ? void $.ajax({
			type: "POST",
			dataType: "json",
			url: G.appHost + "explorer/pathRname",
			data: "path=" + urlEncode(a) + "&rnameTo=" + urlEncode(b),
			beforeSend: function() {
				Tips.loading()
			},
			error: core.ajaxError,
			success: function(a) {
				Tips.close(a),
				"function" == typeof c && c(a && a.info ? a.info: !1)
			}
		}) : void("function" == typeof c && c()) : void 0
	},
	j = function(a, b, c, d) {
		if (c = void 0 == c ? !1 : c, d = void 0 == d ? !1 : d, window.event && window.event.shiftKey && (d = !0), !(a.length < 1)) {
			var e = LNG.remove_title,
			g = LNG.remove_info,
			h = G.appHost + "explorer/pathDelete",
			i = f(a);
			if ("share" == a[0].type && (e = LNG.share_remove, g = LNG.share_remove_tips, h = G.appHost + "userShare/del"), d && (g = LNG.remove_info_force, e = LNG.remove_title_force, h += "&shiftDelete=1"), ("recycle-clear" == a[0].type || G.USER_RECYCLE && G.thisPath == G.USER_RECYCLE || G.thisPath == core.pathFather(G.myhome) + "recycle_kod/") && (g = LNG.recycle_clear_info, h = G.appHost + "explorer/pathDeleteRecycle", e = LNG.recycle_clear, "recycle-clear" == a[0].type && (i = "postEmpty=1")), a[0] && a[0].path) {
				var j = "<b>" + htmlEncode(core.pathThis(a[0].path)) + "</b>";
				"share" == a[0].type && G.selfShare[a[0].path] && (j = "<b>" + htmlEncode(G.selfShare[a[0].path].name) + "</b>"),
				g = a.length > 1 ? j + ' ... <span class="label label-warning">' + a.length + LNG.remove_item + "</span><br/>" + g: j + "<br/>" + g
			}
			var k = function() {
				$.ajax({
					url: h,
					type: "POST",
					dataType: "json",
					data: i,
					beforeSend: function() {
						Tips.loading()
					},
					error: core.ajaxError,
					success: function(c) {
						if (Tips.close(c), ShareData.frameTop("",
						function(a) {
							a.ui.f5()
						}), "share" == a[0].type) {
							G.selfShare = c.info;
							var d = $.dialog.list["share-dialog"];
							d && d.close()
						}
						e == LNG.recycle_clear ? core.playSound("recycle_clear") : core.playSound("file_remove"),
						"function" == typeof b && b(c)
					}
				})
			};
			c ? k() : $.dialog({
				id: "dialog-path-remove",
				fixed: !0,
				icon: "question",
				title: e,
				padding: "40px 40px",
				lock: !0,
				background: "#000",
				opacity: .1,
				content: "<div style='width:200px'>" + g + "</div>",
				ok: k,
				cancel: !0
			})
		}
	},
	k = function(a) {
		if (core.authCheck("explorer.fileDownload", !0) && !(a.length < 1)) {
			var b = G.appHost + "explorer/zipDownload";
			"undefined" != typeof G.sharePage && (b = G.appHost + "share/zipDownload&user=" + G.user + "&sid=" + G.sid),
			$.ajax({
				url: b,
				type: "POST",
				dataType: "json",
				data: f(a),
				beforeSend: function() {
					Tips.loading(LNG.zip_download_ready)
				},
				error: core.ajaxError,
				success: function(a) {
					Tips.close(a),
					Tips.tips(a);
					var b = G.appHost + "explorer/fileDownloadRemove&path=" + urlEncode(a.info);
					b += "&accessToken=" + G.accessToken,
					"undefined" != typeof G.sharePage && (b = G.appHost + "share/fileDownloadRemove&user=" + G.user + "&sid=" + G.sid + "&path=" + urlEncode(a.info)),
					$.dialog({
						icon: "succeed",
						title: !1,
						time: 2,
						content: LNG.download_ready + "..."
					}),
					$('<iframe src="' + b + '" style="display:none;width:0px;height:0px;"></iframe>').appendTo("body")
				}
			})
		}
	},
	l = function(a, b, c) {
		a.length < 1 || (c || (c = "zip"), $.ajax({
			url: G.appHost + "explorer/zip&fileType=" + c,
			type: "POST",
			dataType: "json",
			data: f(a),
			beforeSend: function() {
				Tips.loading(LNG.ziping)
			},
			error: core.ajaxError,
			success: function(a) {
				Tips.close(a),
				a.code && core.playSound("drag_drop"),
				"function" == typeof b && b(a.info)
			}
		}))
	},
	m = function(a, b, c) {
		if (a) {
			var d = function(a) {
				$.ajax({
					url: a,
					beforeSend: function() {
						Tips.loading(LNG.unziping)
					},
					error: core.ajaxError,
					success: function(a) {
						Tips.close(a),
						"function" == typeof b && b(a)
					}
				})
			},
			e = G.appHost + "explorer/unzip&path=" + urlEncode(a);
			"toThis" == c && (e += "&toThis=1"),
			"toFolder" == c ? core.api.pathSelect({
				type: "folder",
				title: LNG.unzip_to
			},
			function(a) {
				e += "&pathTo=" + a,
				d(e)
			}) : d(e)
		}
	},
	n = function(a) {
		var b = a.path,
		c = core.pathPre(b);
		if (c == G.KOD_GROUP_PATH || c == G.KOD_GROUP_SHARE || c == G.KOD_USER_SHARE) return void Tips.tips(LNG.path_can_not_share, "warning");
		var d = "folder" == a.type ? "folder": "file";
		b.length < 1 || core.authCheck("userShare.set", !0) && $.ajax({
			url: G.appHost + "userShare/checkByPath&path=" + urlEncode(b),
			dataType: "json",
			error: core.ajaxError,
			success: function(a) {
				if (a.code) o(a.data);
				else {
					G.selfShare = a.info;
					var c = {
						path: b,
						type: d,
						name: core.pathThis(b)
					};
					p(c,
					function(a) {
						a.code ? (G.selfShare = a.info, ui.f5(), o(a.data)) : (Tips.tips(a), o(void 0,
						function() {
							$(".content-info input[name=type]").val(d),
							$(".content-info input[name=path]").val(b),
							$(".content-info input[name=name]").val(core.pathThis(b) + "(1)"),
							"file" == d && ($(".label-code-read").addClass("hidden"), $(".label-can-upload").addClass("hidden"))
						}))
					})
				}
			}
		})
	},
	o = function(b, c) {
		0 != $(".share-dialog").length && $(".share-dialog").shake(3, 30, 100),
		a.async(["lib/jquery.datetimepicker/jquery.datetimepicker.css", "lib/jquery.datetimepicker/jquery.datetimepicker.js"],
		function() {
			q(b),
			void 0 != c && c()
		})
	},
	p = function(a, b) {
		$.ajax({
			url: G.appHost + "userShare/set",
			data: a,
			type: "POST",
			dataType: "json",
			beforeSend: function(a) {
				$(".share-create-button").addClass("disabled")
			},
			error: function() {
				Tips.tips(LNG.error, !1)
			},
			success: function(a) {
				$(".share-create-button").removeClass("disabled"),
				void 0 != b && b(a)
			}
		})
	},
	q = function(b) {
		var c = a("./tpl/share.html"),
		d = template.compile(c),
		e = d({
			LNG: LNG
		});
		$.dialog({
			id: "share-dialog",
			simple: !0,
			resize: !1,
			width: "425px",
			title: LNG.share,
			padding: "0",
			fixed: !0,
			content: e
		});
		var f = "zh-CN" == G.lang ? "ch": "en";
		$("#share-time").datetimepicker({
			format: "Y/m/d H:i",
			formatDate: "Y/m/d H:i",
			minDate: date("Y/m/d H:i", time() - 86400),
			timepicker: !0,
			lang: f
		}),
		$("#share-time").unbind("blur").bind("blur",
		function(a) {
			stopPP(a)
		});
		var g = function(a) {
			if (Hook.trigger("explorer.path.share.uiInitStart"), $(".share-setting-more").addClass("hidden"), void 0 == a) $(".share-has-url").addClass("hidden"),
			$(".share-bottom-action .share-remove-button").addClass("hidden"),
			$(".content-info input[name=sid]").val(""),
			$(".content-info input[name=type]").val(""),
			$(".content-info input[name=name]").val(""),
			$(".content-info input[name=showName]").val(""),
			$(".content-info input[name=path]").val(""),
			$(".content-info input[name=timeTo]").val(""),
			$(".content-info input[name=sharePassword]").val(""),
			$(".share-view-info").addClass("hidden");
			else {
				a.options && (a.codeRead = a.options.codeRead, a.canUpload = a.options.canUpload, a.notDownload = a.options.notDownload),
				"undefined" == typeof a.canUpload && (a.canUpload = ""),
				b = a,
				a.showName || (a.showName = a.name),
				$(".content-info input[name=sid]").val(a.sid),
				$(".content-info input[name=type]").val(a.type),
				$(".content-info input[name=name]").val(a.name),
				$(".content-info input[name=showName]").val(a.showName),
				$(".content-info input[name=path]").val(a.path),
				$(".content-info input[name=timeTo]").val(a.timeTo),
				$(".content-info input[name=sharePassword]").val(a.sharePassword),
				$(".share-view-info").removeClass("hidden"),
				"undefined" == typeof a.numDownload && (a.numDownload = 0),
				"undefined" == typeof a.numView && (a.numView = 0);
				var c = LNG.share_view_num + a.numView + "  " + LNG.share_download_num + a.numDownload;
				$(".share-view-info").html(c),
				"1" == a.codeRead ? $(".content-info input[name=codeRead]").attr("checked", "checked") : $(".content-info input[name=codeRead]").removeAttr("checked"),
				"1" == a.notDownload ? $(".content-info input[name=notDownload]").attr("checked", "checked") : $(".content-info input[name=notDownload]").removeAttr("checked"),
				"1" == a.canUpload ? $(".content-info input[name=canUpload]").attr("checked", "checked") : $(".content-info input[name=canUpload]").removeAttr("checked"),
				$(".share-has-url").removeClass("hidden"),
				"file" == a.type ? ($(".label-code-read").addClass("hidden"), $(".label-can-upload").addClass("hidden")) : ($(".label-code-read").removeClass("hidden"), $(".label-can-upload").removeClass("hidden"));
				var d = a.type;
				"folder" == a.type && (d = 1 == a.codeRead ? "codeRead": "folder");
				var e = G.appHost + "share/" + d + "&user=" + G.userID + "&sid=" + a.sid;
				$(".content-info .share-url").val(e),
				(a.timeTo || a.canUpload || a.codeRead || a.notDownload) && $(".share-setting-more").removeClass("hidden"),
				$(".share-remove-button").removeClass("hidden"),
				$(".share-create-button").text(LNG.share_save),
				Hook.trigger("explorer.path.share.uiInit")
			}
		},
		h = function() {
			var a = "";
			$(".share-dialog .content-info input[name]").each(function() {
				var b = urlEncode($(this).val());
				"checkbox" == $(this).attr("type") && (b = $(this).attr("checked") ? "1": ""),
				a += "&" + $(this).attr("name") + "=" + b
			}),
			p(a,
			function(a) {
				a.code ? (Tips.tips(LNG.success, !0), G.selfShare = a.info, ui.f5()) : Tips.tips(a)
			})
		},
		i = function() {
			$(".share-bottom-action .share-remove-button").unbind("click").click(function() {
				j([{
					type: "share",
					path: b.sid
				}],
				function() {
					ui.f5()
				})
			}),
			$(".content-info .share-more-button").unbind("click").click(function() {
				$(".share-setting-more").toggleClass("hidden")
			}),
			$("[name=sharePassword]").unbind("click").click(function() {
				trim($(this).val()) || $(this).val(roundString(5)),
				$(this).blur().textSelect()
			});
			var a = $(".share-dialog .btn.copy"),
			c = new ClipboardJS(a.get(0), {
				text: function(a) {
					h();
					var b = trim($("[name=sharePassword]").val()),
					c = $(".share-url").val();
					return b.length > 0 && (c = LNG.share_url + ":" + c + "  " + LNG.share_password + ":" + b),
					c
				}
			});
			c.on("success",
			function(a) {
				$("input.share-url").textSelect()
			}),
			$(".share-bottom-action .share-create-button").unbind("click").click(function() {
				h();
				var a = $.dialog.list["share-dialog"];
				a && a.close()
			}),
			$(".content-info .open-window").unbind("click").bind("click",
			function() {
				h(),
				window.open($("input.share-url").val())
			}),
			$(".share-bottom-action .share-qrcode-button").unbind("click").bind("click",
			function() {
				core.qrcode($("input.share-url").val())
			});
			var d = $("input.share-url");
			d.get(0);
			d.unbind("hover click").bind("hover click",
			function(a) {
				d.textSelect()
			})
		};
		g(b),
		i()
	},
	r = function(a) {
		$.ajax({
			url: G.appHost + "setting/set&k=wall&v=" + urlEncode(a),
			dataType: "json",
			success: function(a) {
				Tips.tips(a)
			}
		})
	},
	s = function(a, b, c, d, e) {
		if (! (a.length < 1)) {
			var f, g = G.myDesktop;
			d && (g = core.pathFather(a)),
			f = "folder" == c ? "ui.path.list(hashDecode('" + hashEncode(a) + "'));": "ui.path.open(hashDecode('" + hashEncode(a) + "'));";
			var h = urlEncode(g + b + ".oexe"),
			i = core.getPathIcon(a);
			"" == i.icon && (i.icon = c),
			$.ajax({
				url: G.appHost + "explorer/mkfile&path=" + h,
				type: "POST",
				dataType: "json",
				data: {
					content: jsonEncode({
						type: "app_link",
						content: f,
						icon: i.icon
					})
				},
				success: function(a) {
					Tips.tips(a),
					a.code && (ShareData.frameTop("",
					function(a) {
						a.ui.f5()
					}), "function" == typeof e && e(a.info))
				}
			})
		}
	},
	t = function(a, b) {
		if (! (a.length < 1)) {
			var c = core.pathThis(a),
			d = core.pathFather(a);
			jsrun = "core.explorerCode('" + urlEncode(a) + "');";
			var e = urlEncode(d + c + "_project.oexe");
			$.ajax({
				url: G.appHost + "explorer/mkfile&path=" + e,
				type: "POST",
				dataType: "json",
				data: 'content={"type":"app_link","content":"' + jsrun + '","icon":"folder.png"}',
				success: function(a) {
					a.code && "function" == typeof b && b(a.info)
				}
			})
		}
	},
	u = function(a, b, c) {
		if (a) {
			var d = G.appHost + "explorer/imageRotate&rotate=" + b + "&path=" + urlEncode(a);
			$.ajax({
				url: d,
				beforeSend: function() {
					Tips.loading(LNG.loading)
				},
				error: core.ajaxError,
				success: function(a) {
					return a ? (Tips.close(a), void(a.code && "function" == typeof c && c(a))) : void Tips.close(LNG.php_env_error_gd, !1)
				}
			})
		}
	},
	v = function(b) {
		var c = {};
		c.fileInfo = a("./tpl/fileinfo/fileInfo.html"),
		c.pathInfo = a("./tpl/fileinfo/pathInfo.html"),
		c.pathInfoMore = a("./tpl/fileinfo/pathInfoMore.html"),
		b.length < 1 && (b = [{
			path: G.thisPath,
			type: "folder"
		}]);
		var d = "info";
		1 == b.length && (d = "file" == b[0].type ? core.pathExt(b[0].path) : "folder"),
		Tips.loading(LNG.getting),
		core.fileInfo(f(b),
		function(a) {
			if (!a.code) return void Tips.close(a);
			Tips.close(LNG.get_success, !0);
			var e = "pathInfoMore",
			f = LNG.info;
			1 == b.length && (e = "folder" == b[0].type ? "pathInfo": "fileInfo", f = core.pathThis(b[0].path), f.length > 15 && (f = f.substr(0, 15) + "...  " + LNG.info));
			var g = template.compile(c[e]),
			h = UUID();
			a.data.is_root = G.isRoot,
			a.data.LNG = LNG,
			a.data.atime = date(LNG.time_type_info, a.data.atime),
			a.data.ctime = date(LNG.time_type_info, a.data.ctime),
			a.data.mtime = date(LNG.time_type_info, a.data.mtime),
			a.data.sizeFriendly = pathTools.fileSize(a.data.size);
			var i = $.dialog({
				id: h,
				className: "pathInfo-dialog",
				padding: 5,
				ico: core.iconSmall(d),
				fixed: !0,
				title: f,
				content: g(a.data),
				ok: !0
			}),
			j = 15 * $(".aui-outer .pathinfo").length;
			i.DOM.wrap.css({
				left: "+=" + j + "px",
				top: "+=" + j + "px"
			}),
			w(h, b)
		})
	},
	w = function(a, b) {
		var c = $("." + a);
		c.find(".open-window").bind("click",
		function() {
			window.open(c.find("input.download-url").val())
		}),
		c.find(".qrcode").unbind("click").bind("click",
		function() {
			core.qrcode(c.find("input.download-url").val(), c.find(".qrcode").get(0))
		});
		var d = c.find(".file-md5-loading");
		if (1 == d.length) {
			var e = f(b);
			e += "&getMd5=1",
			core.fileInfo(e,
			function(a) {
				d.removeClass("file-md5-loading"),
				a.code ? d.html(a.data.fileMd5) : d.html(LNG.error)
			})
		}
		var g = c.find("input.download-url"),
		h = g.get(0);
		g.unbind("hover click").bind("hover click",
		function(a) {
			$(this).focus();
			var b = g.val().length;
			if ($.browser.msie) {
				var c = h.createTextRange();
				c.moveEnd("character", -h.value.length),
				c.moveEnd("character", b),
				c.moveStart("character", 0),
				c.select()
			} else h.setSelectionRange(0, b)
		}),
		c.find(".edit-chmod").click(function() {
			var a = $(this).parent().find("input"),
			c = $(this);
			$.ajax({
				url: G.appHost + "explorer/pathChmod&mod=" + a.val(),
				type: "POST",
				data: f(b),
				beforeSend: function() {
					c.text(LNG.loading)
				},
				error: function(a) {
					c.text(LNG.button_save)
				},
				success: function(a) {
					c.text(a.data).animate({
						opacity: .6
					},
					400, 0).delay(1e3).animate({
						opacity: 1
					},
					200, 0,
					function() {
						c.text(LNG.button_save)
					}),
					a.code && ui.f5()
				}
			})
		})
	},
	x = function(a, b, c) {
		var d = function() {
			$.ajax({
				url: G.appHost + "fav/del&name=" + urlEncode(a),
				dataType: "json",
				async: !1,
				success: function(a) {
					"function" == typeof b && b(a)
				}
			})
		};
		return c ? void d() : void $.dialog({
			id: "dialog-fav-remove",
			fixed: !0,
			icon: "question",
			title: LNG.fav_remove,
			width: 200,
			padding: "40px 20px",
			content: LNG.fav_remove + "?",
			ok: d,
			cancel: !0
		})
	},
	y = function(a) {
		if (a) {
			if ( - 1 == trim(core.pathClear(a.path), "/").indexOf("/")) {
				var b = core.getPathIcon(a.path, a.name);
				"" != b.icon && (a.ext = b.icon, a.name = b.name)
			}
			"/" == a.path && (a.name = "Home"),
			$.ajax({
				url: G.appHost + "fav/add",
				dataType: "json",
				data: a,
				success: function(a) {
					Tips.tips(a),
					a.code && !core.isApp("desktop") && ui.tree.refreshFav()
				}
			})
		}
	},
	z = function(a) {
		var b = {};
		return b.type = a.find("input[type=radio]:checked").val(),
		b.content = a.find("textarea").val(),
		b.group = a.find("[name=group]").val(),
		a.find("input[type=text]").each(function() {
			var a = $(this).attr("name");
			b[a] = $(this).val()
		}),
		a.find("input[type=checkbox]").each(function() {
			var a = $(this).attr("name");
			b[a] = "checked" == $(this).attr("checked") ? 1 : 0
		}),
		b
	},
	A = function(a) {
		a.find(".type input").change(function() {
			var b = $(this).attr("apptype");
			a.find("[data-type]").addClass("hidden"),
			a.find("[data-type=" + b + "]").removeClass("hidden")
		}),
		a.find(".app-edit-select-icon").unbind("click").bind("click",
		function() {
			var b = G.basicPath + "static/images/file_icon/icon_app/";
			G.isRoot || (b = ""),
			core.api.pathSelect({
				type: "file",
				title: LNG.path_api_select_file,
				firstPath: b
			},
			function(b) {
				var b = core.path2url(b);
				a.find(".app-edit-select-icon-input").val(b)
			})
		}),
		a.find(".size-full").unbind("click").bind("click",
		function() {
			var b = $(this).prop("checked");
			b ? (a.find("[name=width]").val("100%"), a.find("[name=height]").val("100%")) : (a.find("[name=width]").val("800"), a.find("[name=height]").val("600"))
		})
	},
	B = function(b, c, d) {
		var e, f, g, h = LNG.app_create,
		i = UUID(),
		j = a("./tpl/appEdit.html"),
		k = template.compile(j);
		switch (void 0 == d && (d = "userEdit"), "rootEdit" == d && (b = b), "userEdit" == d || "rootEdit" == d ? (h = LNG.app_edit, g = k({
			LNG: LNG,
			uuid: i,
			data: b,
			appType: G.settings.appType
		})) : g = k({
			LNG: LNG,
			uuid: i,
			data: {},
			appType: G.settings.appType
		}), $.dialog({
			fixed: !0,
			width: 450,
			id: i,
			padding: 15,
			title: h,
			content: g,
			button: [{
				name: LNG.preview,
				callback: function() {
					return core.openApp(z(e)),
					!1
				}
			},
			{
				name: LNG.button_save,
				focus: !0,
				callback: function() {
					var a = z(e);
					switch (d) {
					case "userAdd":
						var g = urlEncode(G.thisPath + a.name);
						f = G.appHost + "app/userApp&action=add&path=" + g;
						break;
					case "userEdit":
						f = G.appHost + "app/userApp&path=" + urlEncode(b.path);
						break;
					case "rootAdd":
						f = G.appHost + "app/add&name=" + urlEncode(a.name);
						break;
					case "rootEdit":
						f = G.appHost + "app/edit&name=" + urlEncode(a.name) + "&old_name=" + urlEncode(b.name)
					}
					$.ajax({
						url: f,
						type: "POST",
						dataType: "json",
						data: {
							data: urlEncode(jsonEncode(a))
						},
						beforeSend: function() {
							Tips.loading()
						},
						error: core.ajaxError,
						success: function(a) {
							if (Tips.close(a), a.code) if ("rootEdit" == d || "rootAdd" == d) {
								if (!a.code) return;
								ShareData.frameTop("Openapp_store",
								function(a) {
									a.App.reload()
								})
							} else "function" == typeof c ? c() : ui.f5()
						}
					})
				}
			}]
		}), e = $("." + i), G.isRoot || $(".appbox .appline .right a.open").remove(), b.group && e.find("option").eq(b.group).attr("selected", 1), e.find(".aui-content").css("overflow", "inherit"), d) {
		case "userEdit":
			e.find(".name").addClass("hidden"),
			e.find(".desc").addClass("hidden"),
			e.find(".group").addClass("hidden"),
			e.find("option[value=" + b.group + "]").attr("checked", !0),
			"url" != b.type && e.find(".appline[data-type=url]").addClass("hidden");
			break;
		case "userAdd":
			e.find(".desc").addClass("hidden"),
			e.find(".group").addClass("hidden"),
			e.find("[apptype=url]").attr("checked", !0),
			e.find("[data-type=url] input[name=resize]").attr("checked", !0),
			e.find("input[name=width]").attr("value", "800"),
			e.find("input[name=height]").attr("value", "600"),
			e.find("input[name=icon]").attr("value", "oexe.png");
			break;
		case "rootAdd":
			e.find("[apptype=url]").attr("checked", !0),
			e.find("[data-type=url] input[name=resize]").attr("checked", !0),
			e.find("input[name=width]").attr("value", "800"),
			e.find("input[name=height]").attr("value", "600"),
			e.find("input[name=icon]").attr("value", "oexe.png");
			break;
		case "rootEdit":
			e.find("option[value=" + b.group + "]").attr("selected", !0),
			"url" != b.type && e.find(".appline[data-type=url]").addClass("hidden")
		}
		A(e)
	},
	C = function() {
		core.appStore()
	},
	D = function(a) {
		a && a.length < 4 && "http" != a.substring(0, 4) || $.ajax({
			url: G.appHost + "app/getUrlTitle&url=" + a,
			dataType: "json",
			beforeSend: function() {
				Tips.loading()
			},
			success: function(b) {
				var c = b.data;
				c = c.replace(/[\/\\]/g, "_"),
				Tips.close(b);
				var d = {
					content: a,
					type: "url",
					desc: "",
					group: "others",
					icon: "internet.png",
					name: c,
					resize: 1,
					simple: 0,
					height: "70%",
					width: "90%"
				},
				e = urlEncode(G.thisPath + c);
				a = G.appHost + "app/userApp&action=add&path=" + e,
				$.ajax({
					url: a,
					type: "POST",
					dataType: "json",
					data: {
						data: urlEncode(jsonEncode(d))
					},
					success: function(a) {
						Tips.close(a),
						a.code && ui.f5()
					}
				})
			}
		})
	};
	return {
		makeJson: f,
		appEdit: B,
		appList: C,
		appAddURL: D,
		share: n,
		shareBox: o,
		setBackground: r,
		createLink: s,
		createProject: t,
		imageRotate: u,
		newFile: g,
		newFolder: h,
		rname: i,
		zipDownload: k,
		zip: l,
		unZip: m,
		info: v,
		remove: j,
		fav: y,
		favRemove: x
	}
});;
define("app/path/tpl/share.html", [], '<div class=\'content-box can-not-select\'>\n	<div class=\'title\'>\n		<div class="titleinfo">{{LNG.share_title}}</div>\n		<div class="share-view-info"></div>\n	</div>\n	<div class=\'content-info\'>\n		<div class="input-line share-has-url clear">\n			<span class="input-title">{{LNG.share_url}}:</span>\n			<div class="input-group">\n			  <input type="text" class="share-url" aria-label="Text input with segmented button dropdown">\n			  <div class="input-group-btn">\n				<button type="button" class="btn btn-default copy"><i class="icon-copy"></i>  &nbsp;{{LNG.copy}}</button>\n				<button type="button" class="btn btn-default open-window">{{LNG.open}}</button>\n				<!-- <button type="button" class="btn btn-default qrcode"><i class="icon-qrcode"></i></button> -->\n			  </div>\n			</div>\n			<div style="clear:both"></div>\n		</div>\n		<div class="input-line">\n			<span class="input-title">{{LNG.share_password}}:</span>\n			<input type="text" placeholder="{{LNG.share_password}}" name="sharePassword"/>\n			<i class="desc">{{LNG.share_password_desc}}</i>\n			<div style="clear:both"></div>\n		</div>\n		<div class="share-more-line"></div>\n		<button class="share-more-button btn btn-default btn-sm">{{LNG.more}}<b class="caret"></b></button>\n		<div class="share-setting-more">\n			<div class="input-line share-others">\n				<span class="input-title">{{LNG.others}}:</span>\n				<label class="label-code-read">\n					<input type="checkbox" name="codeRead" class="kui-checkbox size-small" value="">\n					<span>{{LNG.share_code_read}}</span>\n				</label>\n				<label>\n					<input type="checkbox" name="notDownload" class="kui-checkbox size-small" value="">\n					<span>{{LNG.share_not_download}}</span>\n				</label>\n				<label class="label-can-upload">\n					<input type="checkbox" name="canUpload" class="kui-checkbox size-small" value="">\n					<span>{{LNG.share_can_upload}}</span>\n				</label>\n\n				<div style="clear:both"></div>\n			</div>\n			<div class="input-line">\n				<span class="input-title">{{LNG.share_name}}:</span>\n				<input type="hidden" name="sid"/>\n				<input type="hidden" name="type"/>\n				<input type="hidden" name="name"/>\n				<input class="share-name" type="text" placeholder="{{LNG.share_name}}" name="showName"/>\n				<div style="clear:both"></div>\n			</div>\n			<div class="input-line">\n				<span class="input-title">{{LNG.share_path}}:</span>\n				<input class="share-name" type="text" name="path" value="" />\n				<div style="clear:both"></div>\n			</div>\n			<div class="input-line">\n				<span class="input-title">{{LNG.share_time}}:</span>\n				<input id="share-time" type="text" placeholder="{{LNG.share_time}}" name="timeTo"/>\n				<i class="desc">{{LNG.share_time_desc}}</i>\n				<div style="clear:both"></div>\n			</div>\n		</div>		\n	</div>\n	<div class="share-bottom-action">\n		<a href="javascript:void(0);" class="share-qrcode-button" title="{{LNG.qrcode}}"><i class="font-icon icon-qrcode"></i></a>\n		<button type="button" class="btn btn-primary share-create-button">{{LNG.share_create}}</button>\n		<a type="button" href="javascript:void(0);" class="share-remove-button">{{LNG.share_cancle}}</a>\n	</div>\n</div>');;
define("app/path/tpl/fileinfo/fileInfo.html", [], "<div class='pathinfo'>\n	{{if downloadPath}}\n	<div class='p info-item-link'>\n		<div class='title' style=\"line-height: 30px;\">{{LNG.download_address}}:</div>\n		<div class=\"content input-group\">\n			<input type=\"text\" class=\"download-url\" value='{{downloadPath}}'>\n			<div class=\"input-group-btn\">\n				<button type=\"button\" class=\"btn btn-default open-window\">{{LNG.open}}</button>\n				<button type=\"button\" class=\"btn btn-default qrcode\"><i class=\"icon-qrcode\"></i></button>\n			</div>\n		</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='line'></div>\n	{{/if}}\n\n	<div class='p info-item-address'>\n		<div class='title'>{{LNG.address}}:</div>\n		<div class='content' id='id_fileinfo_path'>{{path |kod.window.htmlEncode}}</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='p info-item-size'>\n		<div class='title'>{{LNG.size}}:</div>\n		<div class='content'>{{sizeFriendly}} {{if size>1024}}<span>({{size.toLocaleString()}} Byte)</span>{{/if}}</div>\n		<div style='clear:both'></div>\n	</div>\n\n	{{if fileMd5}}\n	<div class='p info-item-md5'>\n		<div class='title'>MD5:</div>\n		<div class='content {{if fileMd5 == \"...\"}}file-md5-loading{{/if}}'>{{fileMd5}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if imageSize}}\n	<div class='p info-item-image-size'>\n		<div class='title'>{{LNG.image_size}}:</div>\n		<div class='content'>{{imageSize.width}} × {{imageSize.height}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	<div class='line'></div>\n\n	{{if ctime}}\n	<div class='p info-item-create-time'>\n		<div class='title'>{{LNG.create_time}}</div>\n		<div class='content'>{{ctime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if mtime}}\n	<div class='p info-item-modify-time'>\n		<div class='title'>{{LNG.modify_time}}</div>\n		<div class='content'>{{mtime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if atime}}\n	<div class='p info-item-last-time'>\n		<div class='title'>{{LNG.last_time}}</div>\n		<div class='content'>{{atime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if owner}}\n	<div class='p info-item-owner'>\n		<div class='title'>{{LNG.file_info_owner}}</div>\n		<div class='content'>{{owner}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if group}}\n	<div class='p info-item-group'>\n		<div class='title'>{{LNG.file_info_group}}</div>\n		<div class='content'>{{group}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n	\n	{{if mode && is_root==\"1\"}}\n	<div class='line'></div>\n	<div class='p info-item-mode change_permission'>\n		<div class='title'>{{LNG.permission}}:</div>\n		<div class='content'>{{mode}}</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='p info-item-chmod'>\n		<div class='title'>{{LNG.permission_edit}}:</div>\n		<div class='content'><input type='text' class='info-chmod' value='755'/>\n		<button class='btn btn-default btn-sm edit-chmod' type='button'>{{LNG.button_save}}</button></div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n</div>\n");;
define("app/path/tpl/fileinfo/pathInfo.html", [], "<div class='pathinfo'>\n	<div class='p info-item-address'>\n		<div class='title'>{{LNG.address}}:</div>\n		<div class='content'>{{path |kod.window.htmlEncode}}</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='p info-item-size'>\n		<div class='title'>{{LNG.size}}:</div>\n		<div class='content'>{{sizeFriendly}}{{if size>1024}}<span>({{size.toLocaleString()}} Byte)</span>{{/if}}</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='p info-item-count'>\n		<div class='title'>{{LNG.contain}}:</div> \n		<div class='content'>{{fileCount}}  {{LNG.file}},{{folderCount}}  {{LNG.folder}}</div>\n		<div style='clear:both'></div>\n	</div>\n	\n	<div class='line'></div>\n	{{if ctime}}\n	<div class='p info-item-create-time'>\n		<div class='title'>{{LNG.create_time}}</div>\n		<div class='content'>{{ctime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if mtime}}\n	<div class='p info-item-modify-time'>\n		<div class='title'>{{LNG.modify_time}}</div>\n		<div class='content'>{{mtime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if atime}}\n	<div class='p info-item-last-time'>\n		<div class='title'>{{LNG.last_time}}</div>\n		<div class='content'>{{atime}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if owner}}\n	<div class='p info-item-owner'>\n		<div class='title'>{{LNG.file_info_owner}}</div>\n		<div class='content'>{{owner}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n	{{if group}}\n	<div class='p info-item-group'>\n		<div class='title'>{{LNG.file_info_group}}</div>\n		<div class='content'>{{group}}</div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n\n\n	{{if mode && is_root==\"1\"}}\n	<div class='line'></div>\n	<div class='p info-item-mode'>\n		<div class='title'>{{LNG.permission}}:</div>\n		<div class='content'>{{mode}}</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='p info-item-chmod'>\n		<div class='title'>{{LNG.permission_edit}}:</div>\n		<div class='content'><input type='text' class='info-chmod' value='755'/>\n		<button class='btn btn-default btn-sm edit-chmod' type='button'>{{LNG.button_save}}</button></div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n</div>\n");;
define("app/path/tpl/fileinfo/pathInfoMore.html", [], "<div class='pathinfo'>\n	<div class='p info-item-count' style='line-height:40px;'>\n		<div class='title'>{{LNG.info}}:</div>\n		<div class='content'>\n			{{fileCount}}  {{LNG.file}},{{folderCount}}  {{LNG.folder}}</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='line info-item-size'></div>\n	<div class='p'>\n		<div class='title'>{{LNG.size}}:</div>\n		<div class='content'>{{sizeFriendly}} {{if size>1024}}<span>({{size.toLocaleString()}} Byte)</span>{{/if}}</div>\n		<div style='clear:both'></div>\n	</div>\n	\n	{{if mode && is_root==\"1\"}}\n	<div class='line'></div>\n	<div class='p info-item-mode'>\n		<div class='title'>{{LNG.permission}}:</div>\n		<div class='content'>{{mode}}</div>\n		<div style='clear:both'></div>\n	</div>\n	<div class='p info-item-chmod'>\n		<div class='title'>{{LNG.permission_edit}}:</div>\n		<div class='content'><input type='text' class='info-chmod' value='755'/>\n		<button class='btn btn-default btn-sm edit-chmod' type='button'>{{LNG.button_save}}</button></div>\n		<div style='clear:both'></div>\n	</div>\n	{{/if}}\n</div>\n");;
define("app/path/tpl/appEdit.html", [], "<div class='appbox'>\n	<div class='appline name'>\n		<div class='left'>{{LNG.name}}</div>\n		<div class='right'><input type='text' name='name' value='{{if data.name}}{{data.name}}{{/if}}'/></div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline desc'>\n		<div class='left'>{{LNG.app_desc}}</div>\n		<div class='right'><input type='text' name='desc' value='{{if data.desc}}{{data.desc}}{{/if}}'/></div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline icon'>\n		<div class='left'>{{LNG.app_icon}}</div>\n		<div class='right'><input type='text' name='icon' class=\"app-edit-select-icon-input\" value='{{if data.icon}}{{data.icon}}{{/if}}'/>\n			<button class='btn btn-default btn-sm open app-edit-select-icon btn-right'>\n				<i class=\"font-icon icon-folder-open\"></i>\n			</button>\n		</div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline group'>\n		<div class='left'>{{LNG.app_group}}</div>\n		<div class='right'>\n		<select name='group'>\n			{{each appType as val index}}\n			<option value ='{{val.type}}'>{{LNG[val.name] || val.name}}</option>\n			{{/each}}\n		<select>\n		</div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline type'>\n		<div class='left'>{{LNG.app_type}}</div>\n		<div class='right'>\n			<input class='w20 kui-radio size-small' type='radio' id='url{{uuid}}' apptype='url' value='url' name='{{uuid}}type' {{if data.type=='url'}}checked='checked'{{/if}}/>\n			<label for='url{{uuid}}'>{{LNG.app_type_url}}</label>\n			<input class='w20 kui-radio size-small' type='radio' id='app{{uuid}}' apptype='app' value='app' name='{{uuid}}type' {{if data.type=='app'}}checked='checked'{{/if}}/>\n			<label for='app{{uuid}}'>{{LNG.app_type_code}}</label>\n			<input class='w20 kui-radio size-small' type='radio' id='app_link{{uuid}}' apptype='app_link' value='app_link' name='{{uuid}}type' {{if data.type=='app_link'}}checked='checked'{{/if}}/>\n			<label for='app_link{{uuid}}'>{{LNG.app_type_link}}</label>\n		</div>\n		<div style='clear:both;'></div>\n	</div>\n\n	<div class='appline' data-type='url'>\n		<div class='left'>{{LNG.app_display}}</div>\n		<div class='right'>\n			<input class='w20 kui-checkbox size-small' type='checkbox' id='simple{{uuid}}' name='simple' {{if data.simple}}checked='true'{{/if}} />\n			<label for='simple{{uuid}}'>{{LNG.app_display_border}}</label>\n			<input class='w20 kui-checkbox size-small' type='checkbox' id='resize{{uuid}}' name='resize' {{if data.resize}}checked='true'{{/if}} />\n			<label for='resize{{uuid}}'>{{LNG.app_display_size}}</label>\n		</div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline' data-type='url'>\n		<div class='left'>{{LNG.app_size}}</div>\n		<div class='right'>\n			<input class='w30' type='text' name='width'  value='{{if data.width}}{{data.width}}{{/if}}'/>({{LNG.width}})&nbsp;&nbsp;\n			<input class='w30' type='text' name='height' value='{{if data.height}}{{data.height}}{{/if}}'/>({{LNG.height}})\n\n			<input class='w20 kui-checkbox size-small size-full' type='checkbox' id='size-full{{uuid}}' \n				{{if data.width=='100%' && data.height=='100%'}}checked='true'{{/if}} />\n			<label for='size-full{{uuid}}'>{{LNG.full_screen}}</label>\n		</div>\n		<div style='clear:both;'></div>\n	</div>\n	<div class='appline content'>\n		<div class='left hidden' data-type='app'>{{LNG.app_code}}</div>\n		<div class='left hidden' data-type='app_link'>{{LNG.app_code}}</div>\n		<div class='left' data-type='url'>{{LNG.app_url}}</div>\n		<div class='right'><textarea name='content'>{{if data.content}}{{data.content}}{{/if}}</textarea></div>\n		<div style='clear:both;'></div>\n	</div>\n</div>\n");;
define("app/path/clipboard", [],
function(a, b) {
	var c = function(a) {
		return ui.path.pathOperate.makeJson(a)
	},
	d = function(a) {
		a.length < 1 || $.ajax({
			url: G.appHost + "explorer/pathCopy",
			type: "POST",
			dataType: "json",
			data: c(a),
			error: core.ajaxError,
			success: function(a) {
				Tips.tips(a)
			}
		})
	},
	e = function(a) {
		a.length < 1 || $.ajax({
			url: G.appHost + "explorer/pathCute",
			type: "POST",
			dataType: "json",
			data: c(a),
			error: core.ajaxError,
			success: function(a) {
				Tips.tips(a)
			}
		})
	},
	f = function(a, b) {
		a && (Tips.loading(LNG.moving), setTimeout(function() {
			var c = G.appHost + "explorer/pathPast&path=" + urlEncode(a);
			$.ajax({
				url: c,
				dataType: "json",
				error: core.ajaxError,
				success: function(a) {
					Tips.close(a.data, a.code),
					"function" == typeof b && b(a.info),
					g()
				}
			})
		},
		50))
	},
	g = function() {
		var a = ShareData.frameTop(""),
		b = a.$.find(".dialogExplorer iframe");
		0 != b.length && (a.ui && a.ui.f5(), $.each(b,
		function(a, b) {
			var c = b.contentWindow;
			c != window && c.ui && c.ui.f5()
		}))
	},
	h = function(a, b, d) {
		b && $.ajax({
			url: G.appHost + "explorer/pathCuteDrag",
			type: "POST",
			dataType: "json",
			data: c(a) + "&path=" + urlEncode(b + "/"),
			beforeSend: function() {
				Tips.loading(LNG.moving)
			},
			error: core.ajaxError,
			success: function(a) {
				Tips.close(a),
				a.code && core.playSound("drag_drop"),
				"function" == typeof d && d(a.info)
			}
		})
	},
	i = function(a, b, d, e) {
		b && (void 0 == e && (e = 0), $.ajax({
			url: G.appHost + "explorer/pathCopyDrag",
			type: "POST",
			dataType: "json",
			data: c(a) + "&path=" + urlEncode(b + "/") + "&filename_auto=" + Number(e),
			beforeSend: function() {
				Tips.loading(LNG.moving)
			},
			error: core.ajaxError,
			success: function(a) {
				Tips.close(a),
				a.code && core.playSound("drag_drop"),
				"function" == typeof d && d(a.info)
			}
		}))
	},
	j = function(a, b) {
		var c = "style='height:150px;border-left: 3px solid #def;overflow:auto;margin:20px;background: #f0f8ff;padding:20px;width:300px'",
		d = "<div " + c + ">" + LNG.clipboard_null + "</div>";
		if (0 != a.length) {
			d = "<div " + c + "><b>" + LNG.clipboard_state + LNG[b] + "</b><br/>";
			for (var e = 40,
			f = 0; f < a.length; f++) {
				var g = a[f],
				h = g.path;
				h = h.length < e ? h: "..." + h.substr( - e),
				d += "<br/>" + g.type + ": <a href='javascript:kodApp.open(\"" + htmlEncode(g.path) + '","' + g.type + "\");'>" + h + "</a>"
			}
			d += '<br/><button class="btn btn-sm btn-default mt-10 clipboard-clear" onclick="">' + LNG.clipboard_clear + "</button></div>"
		}
		return d
	},
	k = function() {
		$.ajax({
			url: G.appHost + "explorer/clipboard",
			dataType: "json",
			error: core.ajaxError,
			success: function(a) {
				a.code && ($.dialog({
					id: "dialog-clipboard",
					title: LNG.clipboard,
					width: 400,
					content: j(a.data, a.info)
				}), $(".clipboard-clear").one("click",
				function() {
					Tips.tips(LNG.success),
					$.get(G.appHost + "explorer/clipboard&clear=ok"),
					$.dialog.list["dialog-clipboard"].close()
				}))
			}
		})
	};
	return {
		copy: d,
		cute: e,
		past: f,
		cuteDrag: h,
		copyDrag: i,
		clipboard: k
	}
});;
define("app/path/search", ["./tpl/search.html", "./tpl/searchList.html"],
function(a, b) {
	var c = a("./tpl/search.html"),
	d = a("./tpl/searchList.html");
	return function(a, b) {
		b || (b = G.thisPath);
		var e, f, g = function() {
			var d = trim(core.pathClear(b), "/");
			if (0 == d.indexOf(G.KOD_USER_SHARE) && -1 == d.indexOf("/") || d == G.KOD_USER_FAV || d == G.KOD_GROUP_ROOT_ALL) return void Tips.tips(LNG.path_cannot_search, !1);
			template.helper("searchResultPrase", j);
			var g = template.compile(c);
			0 == $(".dialog-do-search").length ? (e = $.dialog({
				id: "dialog-do-search",
				padding: 0,
				fixed: !0,
				ico: core.icon("search"),
				resize: !0,
				title: LNG.search,
				width: 460,
				height: 480,
				content: g({
					LNG: LNG
				})
			}), f = l(), f.path = b, "" != a && (f.search = a), $("#search-path").val(f.path), $("#search-value").val(f.search), k()) : ($.dialog.list["dialog-do-search"].display(!0), a && $("#search-value").val(a), $("#search-path").val(b), i())
		},
		h = function() {
			return f = {
				search: $("#search-value").val(),
				path: $("#search-path").val(),
				is_content: Number($("#search-is-content").is(":checked")),
				is_case: Number($("#search-is-case").is(":checked")),
				ext: $("#search-ext").val()
			}
		},
		i = function() {
			h(),
			n(f)
		},
		j = function(a) {
			var b = htmlEncode($("#search-value").val());
			if (a = htmlEncode(a), f.is_case) a = a.replace(b, '<span class="keyword">' + b + "</span>");
			else {
				var c = a.toLowerCase().indexOf(b.toLowerCase());
				a = a.substr(0, c) + '<span class="keyword">' + a.substr(c, b.length) + "</span>" + a.substr(c + b.length)
			}
			return a
		},
		k = function() {
			$("#search-value").die("keyup").live("keyup",
			function(a) {
				core.isApp("editor") || ui.path.setSearchByStr($(this).val())
			}),
			$("#search-value,#search-ext,#search-path").keyEnter(i),
			$(".search-header .btn").die("click").live("click", i),
			$(".search-result .file-item .file-info").die("click").live("click",
			function(a) {
				var b = $(this).parent();
				return b.toggleClass("open"),
				b.find(".result-item").slideToggle(200),
				stopPP(a),
				!1
			}),
			$(".search-result .file-item .file-info .goto").die("click").live("click",
			function(a) {
				var b = $(this).parent().parent(),
				c = pathHashDecode(b.attr("data-path")),
				d = core.pathFather(c);
				return core.openPath(d),
				setTimeout(function() {
					core.isApp("explorer") && ui.path.setSelectByFilename(c)
				},
				200),
				stopPP(a),
				!1
			}),
			$(".search-result .file-item .file-info .title").die("click").live("click",
			function(a) {
				var b = $(this).parent().parent(),
				c = pathHashDecode(b.attr("data-path"));
				return kodApp.setLastOpenTarget(b),
				kodApp.open(c, b.attr("data-ext")),
				stopPP(a),
				!1
			}),
			$(".search-result .file-item .result-info").die("click").live("click",
			function(a) {
				var b = $(this).parent().parent(),
				c = pathHashDecode(b.attr("data-path"));
				$(".search-result .file-item .result-info.this").removeClass("this"),
				$(this).addClass("this");
				var d = parseInt($(this).find(".line").attr("data-line"));
				return ShareData.data("FILE_SEARCH_AT", {
					search: $("#search-value").val(),
					line: d,
					lineIndex: $(this).parent().find("[data-line=" + d + "]").index($(this).find(".line"))
				}),
				kodApp.open(c, b.attr("data-ext"), "aceEditor"),
				stopPP(a),
				!1
			}),
			$(".search-header input[type=checkbox]").on("click",
			function() {
				h(),
				l(f)
			})
		},
		l = function(a) {
			var b = "box_search_config";
			if (void 0 == a) {
				var a = LocalData.getConfig(b);
				return a || (a = {
					search: "",
					is_content: 0,
					is_case: 0,
					ext: ""
				}),
				$("#search-value").val(a.search).textSelect(),
				a.is_content ? $("#search-is-content").attr("checked", "checked") : $("#search-is-content").removeAttr("checked"),
				a.is_case ? $("#search-is-case").attr("checked", "checked") : $("#search-is-case").removeAttr("checked"),
				$("#search-ext").val(a.ext),
				a
			}
			return LocalData.setConfig(b, a)
		},
		m = function(a) {
			var b = $(".file-items"),
			c = $(".search-desc");
			if (!a.code) return c.html(a.data),
			void b.html("");
			if (0 == a.data.fileList.length && 0 == a.data.folderList.length) return c.html(LNG.search_null),
			void b.html("");
			var e = template.compile(d);
			if (b.html(e({
				code: a.code,
				data: a.data,
				LNG: LNG
			})), f.is_content) {
				for (var g = a.data.fileList,
				h = 0,
				i = 0; i < g.length; i++) g[i].searchInfo && (h += g[i].searchInfo.length);
				c.html(LNG.search_result + ": <b>" + h + "(in " + g.length + " files)</b>"),
				a.data.error_info && c.html("<span>" + LNG.seach_result_too_more + "</span>")
			} else c.html(a.data.fileList.length + " " + LNG.file + ", " + a.data.folderList.length + LNG.folder + ".")
		},
		n = function(a) {
			l(a),
			$("#search-value").textFocus();
			var b = $(".file-items"),
			c = $(".search-desc");
			if (!a.search || !a.path) return c.html(LNG.search_info),
			void b.html("");
			var d = G.appHost + "explorer/search";
			"undefined" != typeof G.sharePage && (d = G.appHost + "share/search&user=" + G.user + "&sid=" + G.sid),
			$.ajax({
				url: d,
				dataType: "json",
				type: "POST",
				data: a,
				beforeSend: function() {
					c.hide().html(LNG.searching + '<img src="' + G.staticPath + 'images/common/loading.gif">').fadeIn(100)
				},
				error: function(a, b, d) {
					core.ajaxError(a, b, d),
					c.html(LNG.error)
				},
				success: function(a) {
					m(a)
				}
			})
		};
		g()
	}
});;
define("app/path/tpl/search.html", [], "<div class='do-search-box'>\n	<div class='search-header'>\n		<div class='s_br'>\n			<input type='text' id='search-value'/><button class=\"btn btn-default btn-sm btn-right\"><i class=\"font-icon icon-search\"></i></button>\n			<div style='float:right'>{{LNG.path}}:<input type='text' id='search-path' title=\"\" title-data=\"#search-path\" title-timeout=\"100\"/></div>\n		</div>\n		<div class='s_br'>\n			<input type='checkbox' id='search-is-content' class=\"kui-checkbox size-small\"/>\n			<label for='search-is-content'>{{LNG.search_content}}</label>\n			<input type='checkbox' id='search-is-case' class=\"kui-checkbox size-small\"/>\n			<label for='search-is-case'>{{LNG.search_uplow}}</label>\n			<div style='float:right'>\n				{{LNG.file_type}}:<input type='text' id='search-ext' title='{{LNG.search_ext_tips}}' title-timeout=\"100\"/>\n			</div>\n		</div>\n	</div>\n	<div class=\"search-desc\"></div>\n	<div class='search-result'>\n		<ul class=\"file-items\"></ul>\n	</div>\n</div>\n\n");;
define("app/path/tpl/searchList.html", [], '<!-- 文件夹列表 -->\n{{each data.folderList v i}}\n	 <li class="file-item open" data-path="{{v.path | kod.window.pathHashEncode}}" data-type="folder" data-ext="folder">\n		<div class="file-info">\n			<span class="switch"><i class="font-icon icon-file-text-alt"></i></span>\n			<span class="file-icon">{{\'folder\' |kod.core.icon}}</span>\n			<span class="title" title="{{LNG.goto}} {{v.path | kod.window.htmlEncode}}">{{v.name | searchResultPrase}}</span>\n			<span class="goto" title="{{LNG.open_the_path}}"><i class="icon-folder-open-alt"></i></span>\n		</div>\n	</li>\n{{/each}}\n\n<!-- 文件列表 -->\n{{each data.fileList v i}}\n	{{if v.searchInfo}}\n	<li class="file-item open" data-path="{{v.path | kod.window.pathHashEncode}}" data-type="file" data-ext="{{v.ext}}">\n		<div class="file-info file-result">\n			<span class="switch"><i class="font-icon icon-caret-right"></i></span>\n			<span class="file-icon">{{v.ext |kod.core.icon}}</span>\n			<span class="title" title="{{LNG.goto}} {{v.path | kod.window.htmlEncode}}">\n				{{v.name | kod.window.htmlEncode}}\n			</span>\n			<span class="result-num">{{v.searchInfo.length}}</span>\n			<span class="goto" title="{{LNG.open_the_path}}"><i class="icon-folder-open-alt"></i></span>\n		</div>\n		<ul class="result-item">\n			{{each v.searchInfo value index}}\n			<li class="result-info">\n				<span class="line" data-line="{{value.line}}">{{value.line}}:</span>\n				<span class="search-info">{{@value.str | searchResultPrase}}</span>\n			</li>\n			{{/each}}\n		</ul>\n	</li>\n	{{else}}\n	<li class="file-item open" data-path="{{v.path | kod.window.pathHashEncode}}" data-type="file-name" data-ext="{{v.ext}}">\n		<div class="file-info">\n			<span class="switch"><i class="font-icon icon-file-text-alt"></i></span>\n			<span class="file-icon">{{v.ext |kod.core.icon}}</span>\n			<span class="title" title="{{LNG.goto}} {{v.path | kod.window.htmlEncode}}">{{v.name | searchResultPrase}}</span>\n			<span class="goto" title="{{LNG.open_the_path}}"><i class="icon-folder-open-alt"></i></span>\n		</div>\n	</li>\n	{{/if}}\n{{/each}}\n\n');;
define("app/path/tpl/file/create.html", [], "<div class=\"file select {{if type=='file'}}menu-file{{else}}menu-folder{{/if}} file-icon-edit\" id=\"makefile\">\n	{{if listType=='list'}}<span class=\"children-more\"></span>{{/if}}\n	<div class=\"filename\" style=\"padding-top: 0px;\">\n		<span class=\"title\">\n			{{if type=='folder'}}\n				<div class='ico' filetype='folder'>{{\"folder\" | kod.core.icon}}</div>\n			{{else}}\n				<div class='ico' filetype='{{ext}}'>{{ext | kod.core.icon}}</div>\n			{{/if}}\n			<div class=\"textarea\">\n				{{if listType=='icon'}}\n				<textarea class='newfile fix'>{{newname}}</textarea>\n				{{else}}\n				<input class='newfile fix' value='{{newname}}'/>\n				{{/if}}\n			</div>\n		</span>\n	</div>\n	<div style=\"clear:both;\"></div>\n</div>\n");;
define("app/common/tree", ["../path/pathOperate", "../path/tpl/share.html", "../path/tpl/fileinfo/fileInfo.html", "../path/tpl/fileinfo/pathInfo.html", "../path/tpl/fileinfo/pathInfoMore.html", "../path/tpl/appEdit.html", "../path/clipboard", "../path/search", "../path/tpl/search.html", "../path/tpl/searchList.html"],
function(a, b) {
	var c, d, e = a("../path/pathOperate"),
	f = a("../path/clipboard"),
	g = a("../path/search"),
	h = !1;
	ui.pathOperate = e;
	var i = function(a, b) {
		var c = ["menu-tree-group", "menu-tree-fav", "menu-tree-folder-fav"];
		if (a && a[0] && -1 !== $.inArray(a[0].menuType, c)) return a;
		for (var d = [], e = [], f = 0; f < a.length; f++) a[f].drop = !1,
		a[f].drag = !1,
		a[f].name = a[f].name,
		a[f].isParent && a[f].children && (a[f].children = i(a[f].children)),
		a[f].isWriteable,
		"folder" == a[f].type ? e.push(a[f]) : d.push(a[f]);
		return b ? a: (e = e.sort(function(a, b) {
			var a = a.name,
			b = b.name;
			return pathTools.strSort(a, b)
		}), d = d.sort(function(a, b) {
			var a = a.name,
			b = b.name;
			return pathTools.strSort(a, b)
		}), e.concat(d))
	},
	j = function() {
		var a = {},
		b = "tree_open_" + md5(Config.pageApp),
		c = function(a) {
			if (!LocalData.support()) return {};
			if (void 0 == a) {
				var c = LocalData.getConfig(b);
				return 0 == c ? {}: c
			}
			LocalData.setConfig(b, a)
		},
		e = function(b) {
			for (var c = 0; c < b.length; c++) {
				var d = b[c].path;
				void 0 !== a[d] && (b[c].open = a[d])
			}
			return b
		},
		f = function() {
			for (var b = d.getNodesByFilter(function(a) {
				return 0 == a.level ? !0 : !1
			}), e = {},
			f = 0; f < b.length; f++) e[b[f].path] = b[f].open;
			return a = e,
			c(a),
			a
		};
		return a = c(),
		{
			list: function() {
				return a
			},
			reset: e,
			save: function() {
				setTimeout(f, 50)
			}
		}
	} (),
	k = function() {
		$.ajax({
			url: G.appHost + Config.treeAjaxURL + "&type=init",
			dataType: "json",
			error: function() {
				$("#folder-list-tree").html('<div style="text-align:center;">' + LNG.system_error + "</div>")
			},
			success: function(a) {
				if (!a.code) return void $("#folder-list-tree").html('<div style="text-align:center;">' + LNG.system_error + "</div>");
				var b = i(a.data, !0);
				b = j.reset(b),
				$.fn.zTree.init($("#folder-list-tree"), n, b),
				d = $.fn.zTree.getZTreeObj("folder-list-tree")
			}
		}),
		$(".ztree .switch").die("mouseenter").live("mouseenter",
		function() {
			$(this).addClass("switch_hover")
		}).die("mouseleave").live("mouseleave",
		function() {
			$(this).removeClass("switch_hover")
		}),
		core.isApp("editor") && (Mousetrap.bind("up",
		function(a) {
			l(a, "up")
		}).bind("down",
		function(a) {
			l(a, "down")
		}).bind("left",
		function(a) {
			l(a, "left")
		}).bind("right",
		function(a) {
			l(a, "right")
		}), Mousetrap.bind("enter",
		function(a) {
			tree.open()
		}).bind(["del", "command+backspace"],
		function(a) {
			tree.remove()
		}).bind("f2",
		function(a) {
			stopPP(a),
			tree.rname()
		}).bind(["ctrl+f", "command+f"],
		function(a) {
			stopPP(a),
			tree.search()
		}).bind(["ctrl+c", "command+c"],
		function(a) {
			tree.copy()
		}).bind(["ctrl+x", "command+x"],
		function(a) {
			tree.cute()
		}).bind(["ctrl+v", "command+v"],
		function(a) {
			tree.past()
		}).bind("alt+m",
		function(a) {
			tree.create("folder")
		}).bind("alt+n",
		function(a) {
			tree.create("file")
		}))
	},
	l = function(a, b) {
		stopPP(a);
		var c = d.getSelectedNodes()[0];
		if (c) switch (b) {
		case "up":
			var e = c.getPreNode();
			if (e) {
				if (e.open && e.children.length > 0) for (; e.open && e.children && e.children.length >= 1;) e = e.children[e.children.length - 1]
			} else e = c.getParentNode();
			d.selectNode(e);
			break;
		case "down":
			if (c.open && c.children.length >= 1) e = c.children[0];
			else {
				var f = c,
				e = f.getNextNode() || f.getParentNode().getNextNode();
				try {
					for (; ! e;) f = f.getParentNode(),
					e = f.getNextNode() || f.getParentNode().getNextNode()
				} catch(a) {}
			}
			d.selectNode(e);
			break;
		case "left":
			c.isParent && c.open ? d.expandNode(c, !1) : d.selectNode(c.getParentNode());
			break;
		case "right":
			c.open ? d.selectNode(c.children[0]) : d.expandNode(c, !0)
		}
	},
	m = function() {
		return core.isApp("editor") ? !1 : !0
	},
	n = {
		async: {
			enable: !0,
			dataType: "json",
			url: function() {
				return G.appHost + Config.treeAjaxURL
			},
			autoParam: ["ajax_path=path", "tree_icon=tree_icon"],
			dataFilter: function(a, b, c) {
				return c.code ? i(c.data) : null
			}
		},
		edit: {
			enable: !0,
			showRemoveBtn: !1,
			showRenameBtn: !1,
			drag: {
				isCopy: !1,
				isMove: !1
			}
		},
		view: {
			showLine: !1,
			selectedMulti: !1,
			expandSpeed: "fast",
			dblClickExpand: !1,
			addDiyDom: function(a, b) {
				var c = 15,
				d = $("#" + b.tId + "_switch"),
				e = $("#" + b.tId + "_ico");
				d.remove(),
				b.iconSkin = b.tree_icon;
				var f = b.tree_icon;
				if (b.ext ? f = b.ext: b.tree_icon || (f = b.type), e.before(d).before('<span id="' + b.tId + '_my_ico"  class="tree_icon button">' + core.iconSmall(f) + "</span>").remove(), void 0 != b.ext && e.attr("class", "").addClass("file " + b.ext).removeAttr("style"), b.level >= 1) {
					var g = "<span class='space' style='display: inline-block;width:" + c * b.level + "px'></span>";
					d.before(g)
				}
				d.before("<div class='menu-item'><div class='cert'></div></div>");
				var h = "";
				void 0 != b.menuType ? h = b.menuType: (("file" == b.type || "oexe" == b.ext) && (h = "menu-tree-file"), "folder" == b.type && (h = "menu-tree-folder"));
				var i = LNG.name + ":" + b.name + "\n" + LNG.size + ":" + pathTools.fileSize(b.size) + "\n" + LNG.modify_time + ":" + b.mtime;
				"file" != b.type && (i = b.name),
				d.parent().addClass(h).attr("title", i),
				0 == b.isWriteable && d.parent().addClass("file-not-writeable"),
				0 == b.isReadable && d.parent().addClass("file-not-readable"),
				0 === b.exists && d.parent().addClass("file-not-readable")
			}
		},
		callback: {
			onClick: function(a, b, c) {
				if (0 == c.level && j.save(), $(a.target).hasClass("menu-item") || $(a.target).parent().hasClass("menu-item")) {
					var e = $("#" + c.tId + "_a"),
					f = e.find(".menu-item");
					return e.contextMenu({
						x: f.offset().left + f.width(),
						y: f.offset().top
					}),
					stopPP(a)
				}
				return d.selectNode(c),
				core.isApp("editor") && "folder" == c.type ? void d.expandNode(c) : void(core.isApp("editor") || "folder" != c.type ? (kodApp.setLastOpenTarget($("#" + c.tId)), kodApp.open(o().path)) : ui.path.list(c.path))
			},
			beforeDblClick: function() {
				return ! 0
			},
			onCollapse: function(a, b, c) {
				0 == c.level && j.save()
			},
			onExpand: function(a, b, c) {
				0 == c.level && j.save()
			},
			onDblClick: function(a, b, c) {
				return $(a.target).hasClass("switch") || !m() ? !1 : void d.expandNode(c)
			},
			beforeRightClick: function(a, b) {
				d.selectNode(b)
			},
			beforeAsync: function(a, b) {
				b.ajax_name = b.name,
				b.ajax_path = b.path,
				$("#" + b.tId + "_my_ico").addClass("ico_loading")
			},
			onAsyncSuccess: function(a, b, e, f) {
				return $("#" + e.tId + "_my_ico").removeClass("ico_loading"),
				0 == f.data.length ? void d.removeChildNodes(e) : void("function" == typeof c && (c(), c = void 0))
			},
			onRename: function(a, b, f, g) {
				var h = f.getParentNode();
				if (d.getNodesByParam("name", f.name, h).length > 1) return Tips.tips(LNG.name_isexists, !1),
				void d.removeNode(f);
				if (f.create) {
					var i = f.path + "/" + f.name;
					"folder" == f.type ? e.newFolder(i,
					function(a) {
						c = function() {
							var a = d.getNodesByParam("name", f.name, h)[0];
							d.selectNode(a),
							t()
						},
						p(h)
					}) : e.newFile(i,
					function(a) {
						c = function() {
							var a = d.getNodesByParam("name", f.name, h)[0];
							d.selectNode(a),
							t()
						},
						p(h)
					})
				} else {
					var j = rtrim(f.path, "/"),
					k = core.pathFather(f.path) + f.name;
					e.rname(j, k,
					function(a) {
						f.path = a,
						c = function() {
							var a = d.getNodesByParam("name", f.name, h)[0];
							d.selectNode(a),
							t(),
							"folder" == f.type && ui.path.list(f.path)
						},
						p(h)
					})
				}
			},
			beforeDrag: function(a, b) {
				for (var c = 0,
				d = b.length; d > c; c++) if (b[c].drag === !1) return ! 1;
				return ! 0
			},
			beforeDrop: function(a, b, c, d) {
				return c ? c.drop !== !1 : !0
			},
			onDrop: function(a, b, c, d, e) {
				var g = "",
				h = "",
				i = c[0]; (i.father || i.thisPath) && (g = i.father + urlEncode(i.name), h = d.father + urlEncode(d.name), f.cuteDrag([{
					path: g,
					type: i.type
				}], h,
				function() {
					p(i)
				}))
			}
		}
	},
	o = function(a) {
		if (d) {
			var b = d.getSelectedNodes()[0],
			c = "";
			return b ? (c = b.type, ("_null_" == c || void 0 == c) && (c = "folder"), "file" == c && (c = b.ext), a ? [{
				path: b.path,
				type: c,
				node: b
			}] : {
				path: b.path,
				type: c,
				node: b
			}) : {
				path: "",
				type: ""
			}
		}
	},
	p = function(a) {
		return a || (a = d.getSelectedNodes()[0]),
		a.isParent || (a = a.getParentNode()) ? void d.reAsyncChildNodes(a, "refresh") : void ui.tree.init()
	},
	q = function() {
		s(G.KOD_USER_FAV),
		t()
	},
	r = function() {
		q(),
		s(G.KOD_GROUP_ROOT_SELF),
		s(G.KOD_GROUP_ROOT_ALL)
	},
	s = function(a) {
		var b = d.getNodesByParam("path", a, null);
		p(b[0])
	},
	t = function() {
		core.isApp("explorer") && ui.f5()
	};
	return {
		makeParam: o,
		treeOpenHistory: j,
		treeDataSort: i,
		init: k,
		refresh: p,
		refreshPath: s,
		refreshFav: q,
		refreshGroup: r,
		zTree: function() {
			return d
		},
		openEditor: function() {
			kodApp.open(o().path)
		},
		openWindow: function() {
			kodApp.openWindow(o().path)
		},
		share: function() {
			e.share(o())
		},
		download: function() {
			"folder" == o().type ? e.zipDownload(o(!0)) : kodApp.download(o().path)
		},
		setSelect: function(a) {
			return
		},
		open: function() {
			if (! ($(".dialog-path-remove").length >= 1)) {
				var a = o();
				"oexe" == a.type && (a.path = a.node),
				kodApp.setLastOpenTarget($(".curSelectedNode").parent()),
				kodApp.open(a.path, a.type)
			}
		},
		fav: function() {
			var a = o();
			a.name = a.node.name,
			a.node = "null",
			e.fav(a)
		},
		createLink: function(a) {
			var b = o();
			e.createLink(b.path, b.node.name, b.type, a, t)
		},
		search: function() {
			g("", o().path)
		},
		appEdit: function() {
			var a = o(),
			b = a.node;
			b.path = a.path,
			e.appEdit(b,
			function() {
				p(a.node.getParentNode())
			})
		},
		info: function() {
			e.info(o(!0))
		},
		copy: function() {
			f.copy(o(!0))
		},
		cute: function() {
			f.cute(o(!0))
		},
		copyTo: function() {
			core.api.pathSelect({
				type: "folder",
				title: LNG.copy_to
			},
			function(a) {
				f.copyDrag(o(!0), a, "", !1)
			})
		},
		cuteTo: function() {
			core.api.pathSelect({
				type: "folder",
				title: LNG.cute_to
			},
			function(a) {
				f.cuteDrag(o(!0), a,
				function() {
					s()
				})
			})
		},
		past: function() {
			var a = o();
			a.node.isParent || (a.node = a.node.getParentNode()),
			f.past(a.path,
			function() {
				t(),
				p(a.node)
			})
		},
		clone: function() {
			var a = o();
			a.node.isParent || (a.node = a.node.getParentNode()),
			f.copyDrag(o(!0), core.pathFather(a.path),
			function() {
				t(),
				p("folder" == a.type ? a.node.getParentNode() : a.node)
			},
			!0)
		},
		favRemove: function(a) {
			e.favRemove(o().node.name,
			function(a) {
				Tips.tips(a),
				q()
			})
		},
		remove: function() {
			var a = o(!0),
			b = a[0].node.getParentNode();
			a[0].type = a[0].node.type,
			a[0].type = "folder" == a[0].type ? "folder": "file",
			e.remove(a,
			function() {
				t(),
				p(b)
			})
		},
		checkIfChange: function(a) {
			h || (h = !0, d && (d.getNodesByFilter(function(b) {
				var c = b.path;
				return "folder" == b.type && core.pathClear(c) == core.pathClear(a) && p(b),
				!1
			},
			!0), setTimeout(function() {
				h = !1
			},
			500)))
		},
		explorer: function() {
			var a = d.getSelectedNodes();
			if (a.length <= 0) {
				var b = d.getNodes();
				d.selectNode(b[0])
			}
			var c = o().path;
			"folder" != o().type && (c = core.pathFather(c)),
			core.explorer(c)
		},
		openProject: function() {
			core.explorerCode(o().path)
		},
		create: function(a) {
			var b = d.getSelectedNodes();
			if (b.length <= 0) {
				var e = d.getNodes();
				d.selectNode(e[0])
			} else "file" == b[0].type && d.selectNode(b[0].getParentNode());
			var f = o(),
			g = f.node,
			h = g.getParentNode(),
			i = 0,
			j = "folder" == a ? "": "." + a,
			k = "folder" == a ? LNG.newfolder: LNG.newfile;
			if (0 == d.getNodesByParam("name", k + j, h).length) k += j;
			else {
				for (; d.getNodesByParam("name", k + "(" + i + ")" + j, h).length > 0;) i++;
				k = k + "(" + i + ")" + j
			}
			var l = {
				name: k,
				ext: j,
				type: a,
				create: !0,
				path: f.path
			};
			if (void 0 != g.children) {
				var m = d.addNodes(g, l)[0];
				d.editName(m)
			} else "folder" != g.type && (g = g.getParentNode()),
			c = function() {
				var a = d.addNodes(g, l)[0];
				d.editName(a)
			},
			g.isParent ? d.expandNode(g) : c()
		},
		showFile: function() {
			var a = G.appHost + "share/file&sid=" + G.sid + "&user=" + G.user + "&path=" + o().path;
			window.open(a)
		},
		rname: function() {
			var a = d.getSelectedNodes()[0];
			d.editName(a),
			a.beforeName = a.name
		}
	}
});;
define("app/src/explorer/fileListResize", [],
function(a, b) {
	var c = {
		filename: 250,
		filetype: 80,
		filesize: 80,
		filetime: 150,
		explorerTreeWidth: 199,
		editorTreeWidth: 199
	},
	d = {
		filename: 150,
		filetype: 60,
		filesize: 60,
		filetime: 120,
		explorerTreeWidth: 2,
		editorTreeWidth: 2
	},
	e = c,
	f = function() {
		if (LocalData.get("resizeConfig")) e = jsonDecode(LocalData.get("resizeConfig"));
		else {
			"undefined" != typeof G.userConfig.resizeConfig && (e = jsonDecode(htmlDecode(G.userConfig.resizeConfig)));
			var a = jsonEncode(e);
			LocalData.set("resizeConfig", a)
		}
		$.each(c,
		function(a, b) { (!e[a] || e[a] < d[a]) && (e[a] = c[a])
		})
	},
	g = function() {
		if (!j()) {
			var a = jsonEncode(e);
			LocalData.set("resizeConfig", a),
			$.get(G.appHost + "setting/set&k=resizeConfig&v=" + a)
		}
	},
	h = function(a, b) {
		if ("icon" != G.userConfig.listType) {
			a || (a = e);
			var c = "",
			f = 0;
			$.each(a,
			function(a, b) {
				0 == a.indexOf("file") && (b <= d[a] && (b = d[a]), f += b, c += ".children-list,.file-list-list .file ." + a + ",#main-title ." + a + "{width:" + b + "px;}")
			}),
			c += ".children-list,.file-list-list .file{width:" + (f + 50) + "px;}",
			$.setStyle(c, "header-resize-width")
		}
	},
	i = function(a, b, f) {
		if (!$(".frame-left").is(":hidden")) {
			var h = Config.pageApp + "TreeWidth",
			i = $.extend(!0, {},
			e);
			i[h] += a,
			i[h] <= d[h] && (i[h] = d[h]);
			var j = i[h],
			k = $(".frame-left"),
			l = $(".frame-resize"),
			m = $(".frame-right"),
			n = c[h];
			if (j > n - 8 && n + 8 > j && (j = n + 1), f) {
				var o = 400;
				k.animate({
					width: j
				},
				o),
				l.animate({
					left: j - 5
				},
				o),
				m.animate({
					left: j
				},
				o)
			} else k.css("width", j),
			l.css("left", j - 5),
			m.css("left", j);
			"undefined" != typeof ui.setStyle && ui.setStyle(),
			b && (e = i, g())
		}
	},
	j = function() {
		return void 0 != $.getUrlParam("type") ? !0 : !1
	},
	k = function(a, b, c) {
		var f = $.extend(!0, {},
		e);
		f[a] += b,
		h(f),
		c && (e = f, $.each(e,
		function(a, b) {
			b <= d[a] && (e[a] = d[a])
		}), g())
	},
	l = function() {
		$("#main-title").hasClass("bind-init") || (h(e), $("#main-title").addClass("bind-init"), $.each(c,
		function(a, b) {
			$("#main-title ." + a + "-resize").drag({
				start: function() {},
				move: function(b, c) {
					k(a, b, !1)
				},
				end: function(b, c) {
					k(a, b, !0)
				}
			})
		}))
	},
	m = function() {
		var a = $(".frame-resize");
		a.drag({
			start: function() {
				a.addClass("active"),
				$(".resize-mask").css("display", "block")
			},
			move: function(a, b) {
				i(a, !1, !1)
			},
			end: function(b, c) {
				i(b, !0, !1),
				a.removeClass("active"),
				$(".resize-mask").css("display", "none")
			}
		})
	},
	n = function() {
		var a = "fileIconSize";
		core.isApp("desktop") && (a = "fileIconSizeDesktop");
		var b = G.userConfig[a];
		b || (b = "75"),
		q(b, !1),
		o(b)
	},
	o = function(a) {
		$(".set-file-icon-size .file-icon-size").removeClass("selected");
		for (var b = [["40", "box-size-smallx"], ["60", "box-size-small"], ["80", "box-size-default"], ["100", "box-size-big"], ["120", "box-size-bigx"]], c = 10, d = "", e = 0; e < b.length; e++) {
			var f = parseInt(b[e][0]);
			if (a >= f - c && f + c >= a) {
				d = b[e][1];
				break
			}
		}
		"" != d && $("." + d).addClass("selected")
	},
	p = function(a) {
		var b = "fileIconSize";
		core.isApp("desktop") && (b = "fileIconSizeDesktop"),
		G.userConfig[b] = a,
		o(a),
		$.get(G.appHost + "setting/set&k=" + b + "&v=" + a)
	},
	q = function(a, b) {
		var c = a,
		d = 105,
		e = 30,
		f = 250;
		core.isApp("desktop") && (e = 40, f = 150),
		c = e >= c ? e: c,
		c = c >= f ? f: c;
		var g = (a - e) * d / (f - e),
		h = 20,
		i = 10,
		j = parseInt(c),
		k = j + 2 * h - i + 5,
		l = j - i,
		m = j - i,
		n = .4 * j,
		o = j + 3 * h - i,
		q = ".file-list-icon div.file,.file-list-icon .flex-empty{height:" + k + "px;width:" + j + "px;}";
		core.isApp("desktop") && (k -= 5, q = "div.file-list-icon div.file,.file-list-icon .flex-empty{height:" + k + "px;width:" + j + "px;}"),
		$.browser.mozilla && (m -= 4);
		var r = "div.file-list-icon div.file{max-height:" + o + "px;}" + q + "			.file-list-icon .meta-info{height:" + n + "px;width:" + n + "px;				margin-right:" + .16 * n + "px;margin-top:-" + 1.1 * n + "px;}			.file-list-icon div.file .filename{width:" + j + "px;}			.file-list-icon div.file .filename #pathRenameTextarea,			.file-list-icon div.file .filename .newfile{width:" + j + "px;}			.file-list-icon div.file .ico{padding-left:" + i / 2 + "px;height:" + m + "px;width:" + l + "px}        	.file-list-icon div.file .ico.picture{width:" + l + "px;padding-left:" + i / 2 + "px;overflow:hidden;display:block;}        	";
		$.setStyle(r, "file_icon_resize"),
		$(".slider-handle").css("top", g),
		b && p(a)
	},
	r = function() {
		var a, b = $(".slider-handle");
		$(".set-icon-size-slider").bind("click",
		function(a) {
			return stopPP(a),
			!1
		});
		var c = function(b) {
			var c = 0,
			d = 105,
			e = 30,
			f = 250,
			g = a + b;
			g = c > g ? c: g,
			g = g > d ? d: g;
			var h = parseInt(g / d * (f - e) + e);
			return q(h, !1),
			h
		};
		b.drag({
			start: function(c) {
				b.addClass("active"),
				a = parseInt(b.css("top"))
			},
			move: function(a, b, d) {
				c(b)
			},
			end: function(a, d, e) {
				b.removeClass("active"),
				p(c(d), !0)
			}
		});
		var d = $(".slider-bg");
		$(".slider-bg").unbind("click").bind("click",
		function(b) {
			var e = b.clientY - d.offset().top;
			a = 0,
			p(c(e), !0)
		})
	},
	s = function() {
		var a = function(a, b) {
			var c = a.parent(),
			d = $(".split-box").index(c),
			e = parseInt(c.data("before_width")) + b;
			if (! (150 > e)) {
				$($(".split-line").get(d)).css("width", e),
				c.css("width", e),
				$(".split-box:gt(" + d + ")").each(function() {
					$(this).hasClass("is-drag-split") || $(this).css("left", parseInt($(this).data("before_left")) + b + "px")
				});
				var f = [];
				$(".split-box").each(function() {
					f.push({
						left: $(this).css("left"),
						width: $(this).width()
					})
				}),
				LocalData.set("splitBoxSize", jsonEncode(f))
			}
		};
		$(".bodymain .file-list-split .split-drag").drag({
			start: function(a, b) {
				var c = b.parent();
				c.addClass("is-drag-split").data("before_width", c.width()),
				$(".split-box,.split-line").each(function() {
					$(this).data("before_left", $(this).css("left"))
				})
			},
			move: function(b, c, d, e) {
				a(e, b)
			},
			end: function(a, b, c, d) {
				d.parent().removeClass("is-drag-split")
			}
		},
		!0),
		$(".file.select-split-parent").removeClass("select-split-parent"),
		$(".split-box").each(function() {
			$('.file[data-path="' + $(this).attr("data-path") + '"]').addClass("select-split-parent")
		}),
		t()
	},
	t = function() {
		var a = LocalData.get("splitBoxSize"),
		b = 0;
		a = !a || jsonDecode(a) ? [] : jsonDecode(a);
		var c = function(c, d) {
			var e = a[d];
			e || (e = {
				width: 250,
				left: b
			}),
			b += e.width + 1,
			c.css({
				width: e.width + "px",
				left: e.left
			})
		};
		b = 0,
		$(".split-box").each(function(a) {
			c($(this), a)
		}),
		b = 0,
		$(".split-line").each(function(a) {
			c($(this), a)
		}),
		$(".bodymain").scrollLeft(1e5)
	};
	return {
		init: function() {
			f(),
			j() && (e = c),
			h(e),
			m(),
			i(0, !1, !0),
			r()
		},
		initFileSize: n,
		bindSplitResize: s,
		bindHeaderResize: l,
		setFileIconSize: q
	}
});
