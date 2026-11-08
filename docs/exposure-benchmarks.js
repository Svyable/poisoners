/* EPA ambient air and drinking-water concentration benchmarks.
   No conversion from releases in pounds to exposure levels, no hazard ranking. */
(()=>{"use strict";
const $=id=>document.getElementById(id);
const esc=x=>String(x??"").replace(/[&<>"']/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
const channels={ALL:"Both regulatory frameworks",ambient_air:"Ambient air — NAAQS",public_drinking_water:"Public drinking water — MCL"};
function link(url,name){const a=document.createElement("a");a.href=url;a.target="_blank";a.rel="noopener noreferrer";a.className="ch-source";a.textContent=name+" ↗";return a.outerHTML}
function cell(item){
 const regime=item.medium==="ambient_air"?"AIR / NAAQS":"PUBLIC WATER / MCL";
 return '<tr><td><strong>'+esc(item.chemical)+'</strong><small>'+esc(item.notation)+' · '+esc(item.measurement_species)+'</small></td>'+
 '<td><span class="ch-tag">'+regime+'</span><small>'+esc(item.framework)+'</small></td>'+
 '<td><strong>'+esc(item.value)+' '+esc(item.unit)+'</strong><small>'+esc(item.averaging_period)+'</small></td>'+
 '<td>'+esc(item.statistical_form)+'</td>'+
 '<td>'+esc(item.health_context)+'</td>'+
 '<td>'+link(item.source_url,item.source_title)+'</td></tr>';
}
function init(db){
 if(!Array.isArray(db.benchmarks)||db.benchmarks.length===0)throw Error("Missing standards");
 const byMedium=$("ebMedium"),input=$("ebSearch"),count=$("ebCount"),body=$("ebRows");
 for(const [key,value] of Object.entries(channels)){
  const option=document.createElement("option");option.value=key;option.textContent=value;byMedium.add(option);
 }
 const paint=()=>{
  const kind=byMedium.value,query=input.value.toLowerCase().trim();
  const rows=db.benchmarks.filter(b=>(kind==="ALL"||b.medium===kind)&&(b.chemical+" "+b.notation+" "+b.measurement_species+" "+b.framework+" "+b.health_context).toLowerCase().includes(query));
  count.textContent=rows.length+" / "+db.benchmarks.length+" SOURCE-REVIEWED REFERENCE VALUES — NOT MEASURED CONCENTRATIONS AT A FACILITY";
  body.innerHTML=rows.length?rows.map(cell).join(""):'<tr><td colspan="6">No reference match. No number in this table can be converted directly from a facility release mass.</td></tr>';
 };
 byMedium.addEventListener("change",paint);input.addEventListener("input",paint);paint();
}
fetch("exposure-benchmarks.json",{cache:"no-cache"}).then(r=>{if(!r.ok)throw Error("HTTP "+r.status);return r.json()}).then(init).catch(()=>{
 $("ebCount").textContent="BENCHMARK DATA UNAVAILABLE";
 $("ebRows").innerHTML='<tr><td colspan="6">The EPA reference file could not be loaded. <a href="exposure-benchmarks.json">View the verified reference JSON</a>.</td></tr>';
});
})();
