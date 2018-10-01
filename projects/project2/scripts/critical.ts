/**
 * critical scripts
 *
 * Put here all critical staf
 *
 * do not include any library, use vanilla typescript
 */

class Critical {
  public executeOnLoad(): void {
    console.info('this is critical');
  }
}

window.onload = () => new Critical().executeOnLoad();
