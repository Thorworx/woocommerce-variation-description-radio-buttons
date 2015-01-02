jQuery(document).ready(function(t) {
    function a(t, a) {
        for (var r = [], n = 0; n < t.length; n++) {
            {
                var e = t[n];
                e.variation_id
            }
            i(e.attributes, a) && r.push(e)
        }
        return r
    }

    function i(t, a) {
        var i = !0;
        for (attr_name in t) {
            var n = "",
                e = "";
            r > 1 ? (n = String(t[attr_name]).toLowerCase(), e = String(a[attr_name]).toLowerCase()) : (n = t[attr_name], e = a[attr_name], r++), void 0 !== n && void 0 !== e && 0 != n.length && 0 != e.length && n != e && (i = !1)
        }
        return i
    }
    t("form.variations_form").on("click", ".reset_variations", function() {
        return !1
    }).on("change", ".variations input:radio", function() {
        $variation_form = t(this).closest("form.variations_form"), $variation_form.find("input[name=variation_id]").val("").change(), $variation_form.trigger("woocommerce_variation_radio_change").trigger("check_variations", ["", !1]), t(this).blur(), t().uniform && t.isFunction(t.uniform.update) && t.uniform.update()
    }).on("focusin", ".variations input:radio", function() {
        $variation_form = t(this).closest("form.variations_form"), $variation_form.trigger("woocommerce_variation_radio_focusin").trigger("check_variations", [t(this).attr("name"), !0])
    }).on("check_variations", function(i, r, n) {
        var e = !0,
            o = !1,
            d = {},
            s = t(this),
            _ = s.find(".reset_variations");
        s.find(".variations input:radio:checked").each(function() {
            0 == t(this).val().length ? e = !1 : o = !0, r && t(this).attr("name") == r ? (e = !1, d[t(this).attr("name")] = "") : (value = t(this).val().replace(/&/g, "&").replace(/"/g, '"').replace(/'/g, "'").replace(/</g, "<").replace(/>/g, ">"), d[t(this).attr("name")] = value)
        });
        var v = parseInt(s.attr("data-product_id")),
            c = window["product_variations_" + v];
        c || (c = window.product_variations);
        var m = a(c, d);
        if (e) {
            var f = m.pop();
            f ? (r || s.find(".single_variation_wrap").slideDown("200"), s.find("input[name=variation_id]").val(f.variation_id).change(), s.trigger("found_variation", [f])) : (r || s.find(".single_variation_wrap").slideUp("200"), n || s.trigger("reset_image"))
        } else s.trigger("update_variation_values", [m]), n || s.trigger("reset_image"), r || s.find(".single_variation_wrap").slideUp("200");
        o ? "hidden" == _.css("visibility") && _.css("visibility", "visible").hide().fadeIn() : _.css("visibility", "hidden")
    }).on("reset_image", function() {
        var a = t(this).closest(".product"),
            i = a.find("div.images img:eq(0)"),
            r = a.find("div.images a.zoom:eq(0)"),
            n = i.attr("data-o_src"),
            e = i.attr("data-o_title"),
            o = r.attr("data-o_href");
        n && o && e && (i.attr("src", n).attr("alt", e).attr("title", e), r.attr("href", o))
    }).on("update_variation_values", function(a, i) {
        $variation_form = t(this).closest("form.variations_form"), $variation_form.find(".variations input:radio").each(function(a, r) {
            current_attr_radio = t(r), current_attr_radio.find("option:gt(0)").attr("checked", "checked");
            var n = current_attr_radio.attr("name");
            for (num in i) {
                var e = i[num].attributes;
                for (attr_name in e) {
                    var o = e[attr_name];
                    attr_name == n && (o ? (o = t("<div/>").html(o).text(), o = o.replace(/'/g, "\\'"), o = o.replace(/"/g, '\\"'), current_attr_radio.find('option[value="' + o + '"]').removeAttr("checked")) : current_attr_radio.find("option").removeAttr("checked"))
                }
            }
        }), $variation_form.trigger("woocommerce_update_variation_values")
    }).on("found_variation", function(a, i) {
        var r = t(this),
            n = t(this).closest(".product"),
            e = n.find("div.images img:eq(0)"),
            o = n.find("div.images a.zoom:eq(0)"),
            d = e.attr("data-o_src"),
            s = e.attr("data-o_title"),
            _ = o.attr("data-o_href"),
            v = i.image_src,
            c = i.image_link,
            m = i.image_title;
        r.find(".variations_button").show(), r.find(".single_variation").html(i.price_html + i.availability_html), d || (d = e.attr("src") ? e.attr("src") : "", e.attr("data-o_src", d)), _ || (_ = o.attr("href") ? o.attr("href") : "", o.attr("data-o_href", _)), s || (s = e.attr("title") ? e.attr("title") : "", e.attr("data-o_title", s)), v && v.length > 1 ? (e.attr("src", v).attr("alt", m).attr("title", m), o.attr("href", c)) : (e.attr("src", d).attr("alt", s).attr("title", s), o.attr("href", _));
        var f = r.find(".single_variation_wrap");
        n.find(".product_meta").find(".sku").text(i.sku ? i.sku : ""), f.find(".quantity").show(), i.is_in_stock || i.backorders_allowed || r.find(".variations_button").hide(), i.min_qty ? f.find("input[name=quantity]").attr("data-min", i.min_qty).val(i.min_qty) : f.find("input[name=quantity]").removeAttr("data-min"), i.max_qty ? f.find("input[name=quantity]").attr("data-max", i.max_qty) : f.find("input[name=quantity]").removeAttr("data-max"), "yes" == i.is_sold_individually && (f.find("input[name=quantity]").val("1"), f.find(".quantity").hide()), f.slideDown("200").trigger("show_variation", [i])
    }), t("form.variations_form .variations input:radio").change();
    var r = 0
});
